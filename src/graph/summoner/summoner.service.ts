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

  async findOne(id: string): Promise<SummonerNode> {
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

  async remove(id: string): Promise<SummonerNode> {
    return await this.neo4jService
      .write('MATCH (s:Summoner {id: $id}) DETACH DELETE s RETURN s', { id })
      .then((res) => {
        return new SummonerNode(res.records[0].get('s'))
      })
  }
}
