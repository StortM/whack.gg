import { Injectable } from '@nestjs/common'
import { Neo4jService } from 'nest-neo4j/dist'
import { EncryptionService } from '../encryption/encryption.service'
import { CreateSummonerDto } from './dto/create-sumoner.dto'
import { Summoner } from './entities/summoner.entity'

@Injectable()
export class SummonerService {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly encryptionService: EncryptionService
  ) {}

  async create(createSummonerDto: CreateSummonerDto): Promise<Summoner> {
    const { summonerName, password, isAdmin, level, icon } = createSummonerDto

    console.log('here')

    return this.neo4jService
      .write(
        `
            CREATE (s:Summoner {
                id: randomUUID(),
                summonerName: $summonerName,
                hashedPassword: $hashedPassword,
                isAdmin: $isAdmin,
                level: $level,
                icon: $icon
            })
            RETURN s
        `,
        {
          summonerName,
          hashedPassword: await this.encryptionService.hash(password),
          isAdmin,
          level: level ?? null,
          icon: icon ?? null
        }
      )
      .then(({ records }) => new Summoner(records[0].get('s')))
  }

  async findBySummonerName(
    summonerName: string
  ): Promise<Summoner | undefined> {
    const res = await this.neo4jService.read(
      'MATCH (s:Summoner {summonerName: $summonerName}) RETURN s',
      { summonerName }
    )

    return res.records.length
      ? new Summoner(res.records[0].get('s'))
      : undefined
  }

  async updateSummoner(
    summoner: Summoner,
    updates: Record<string, unknown>
  ): Promise<Summoner> {
    if (updates.password)
      updates.password = await this.encryptionService.hash(
        updates.password as string
      )

    return this.neo4jService
      .write(
        `
            MATCH (s:Summoner {id: $id})
            SET u.updatedAt = localdatetime(), u += $updates
            RETURN s
        `,
        { id: summoner.getId(), updates }
      )
      .then(({ records }) => new Summoner(records[0].get('u')))
  }

  /*   async isFollowing(target: Summoner, current: Summoner): Promise<boolean> {
    return this.neo4jService
      .read(
        `
            MATCH (target:User {id: $targetId})<-[:FOLLOWS]-(current:User {id: $currentId})
            RETURN count(*) AS count
        `,
        {
          targetId: target.getId(),
          currentId: current.getId()
        }
      )
      .then((res) => {
        return res.records[0].get('count') > 0
      })
  }

  follow(user: Summoner, username: string): Promise<Summoner | undefined> {
    return this.neo4jService
      .write(
        `
            MATCH (target:User {username: $username})
            MATCH (current:User {id: $userId})

            MERGE (current)-[r:FOLLOWS]->(target)
            ON CREATE SET r.createdAt = datetime()

            RETURN target
        `,
        { username, userId: user.getId() }
      )
      .then((res) => {
        if (res.records.length == 0) return undefined

        return new Summoner(res.records[0].get('target'))
      })
  }

  unfollow(user: Summoner, username: string): Promise<Summoner | undefined> {
    return this.neo4jService
      .write(
        `
            MATCH (target:User {username: $username})

            FOREACH (rel IN [ (target)<-[r:FOLLOWS]-(:User {id: $userId}) | r ] |
                DELETE rel
            )

            RETURN target
        `,
        { username, userId: user.getId() }
      )
      .then((res) => {
        if (res.records.length == 0) return undefined

        return new Summoner(res.records[0].get('target'))
      })
  } */
}
