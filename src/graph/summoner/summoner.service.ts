import { Injectable } from '@nestjs/common'
import { Neo4jService } from 'nest-neo4j/dist'
import { CryptService } from 'src/crypt/crypt.service'
import { CreateSummonerDto } from './dto/create-sumoner.dto'
import { UpdateSummonerDto } from './dto/update-summoner.dto'
import { SummonerNode } from './entities/summoner.entity'

@Injectable()
export class SummonerService {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly cryptService: CryptService
  ) {}

  async create(createSummonerDto: CreateSummonerDto): Promise<SummonerNode> {
    const { summonerName, password, isAdmin, level, icon } = createSummonerDto

    return this.neo4jService
      .write(
        `
            CREATE (s:Summoner {
                id: randomUUID(),
                summonerName: $summonerName,
                passwordHash: $passwordHash,
                isAdmin: $isAdmin,
                level: $level,
                icon: $icon
            })
            RETURN s
        `,
        {
          summonerName,
          passwordHash: await this.cryptService.hash(password),
          isAdmin,
          level: level ?? null,
          icon: icon ?? null
        }
      )
      .then(({ records }) => new SummonerNode(records[0].get('s')))
  }

  async update(
    id: number,
    updateSummonerDto: UpdateSummonerDto
  ): Promise<SummonerNode | undefined> {
    const summonerNode = await this.findOne(updateSummonerDto.id)

    if (!summonerNode) return

    if (updateSummonerDto.password)
      updateSummonerDto.password = await this.cryptService.hash(
        updateSummonerDto.password as string
      )

    return this.neo4jService
      .write(
        `
            MATCH (s:Summoner {id: $id})
            SET u.updatedAt = localdatetime(), u += $updates
            RETURN s
        `,
        { id: summonerNode.getId(), updateSummonerDto }
      )
      .then(({ records }) => new SummonerNode(records[0].get('u')))
  }

  async findAll(): Promise<SummonerNode[]> {
    return await this.neo4jService
      .read('MATCH (s:Summoner) RETURN s')
      .then((res) => {
        return res.records.map((record) => new SummonerNode(record.get('s')))
      })
  }

  async findOne(id: number): Promise<SummonerNode> {
    return await this.neo4jService
      .read('MATCH (s:Summoner {id: $id}) RETURN s', { id })
      .then((res) => {
        return new SummonerNode(res.records[0].get('s'))
      })
  }

  async findBySummonerName(
    summonerName: string
  ): Promise<SummonerNode | undefined> {
    const res = await this.neo4jService.read(
      'MATCH (s:Summoner {summonerName: $summonerName}) RETURN s',
      { summonerName }
    )

    return res.records.length
      ? new SummonerNode(res.records[0].get('s'))
      : undefined
  }

  async remove(id: number): Promise<SummonerNode> {
    return await this.neo4jService
      .write('MATCH (s:Summoner {id: $id}) DETACH DELETE s RETURN s', { id })
      .then((res) => {
        return new SummonerNode(res.records[0].get('s'))
      })
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
