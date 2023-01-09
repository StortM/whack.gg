import { Injectable } from '@nestjs/common'
import { Neo4jService } from 'nest-neo4j/dist'
import { SummonerNode } from '../summoner/entities/summoner.entity'
import { CreateParticipantDto } from './dto/create-participant.dto'
import { UpdateParticipantDto } from './dto/update-participant.dto'
import { ParticipantNode } from './entities/participant.entity'

@Injectable()
export class ParticipantsService {
  constructor(private readonly neo4jService: Neo4jService) {}
  async create(
    createParticipantDto: CreateParticipantDto
  ): Promise<ParticipantNode> {
    const participant = await this.neo4jService
      .write(
        `
        CREATE (p:Participant {
          id: randomUUID(),
          assists: $assists,
          deaths: $deaths,
          kills: $kills,
          baronKills: $baronKills,
          consumablePurchased: $consumablePurchased,
          damageDealtToBuildings: $damageDealtToBuildings,
          damageDealtToObjectives: $damageDealtToObjectives,
          damageDealtToTurrets: $damageDealtToTurrets,
          damageSelfMitigated: $damageSelfMitigated,
          doubleKills: $doubleKills,
          tripleKills: $tripleKills,
          quadraKills: $quadraKills,
          pentaKills: $pentaKills
        })
        RETURN p
      `,
        createParticipantDto
      )
      .then((result) => new ParticipantNode(result.records[0].get('p')))

    // create relation to summoner
    await this.createParticipantRelation(
      participant,
      createParticipantDto.summonerName
    )

    return participant
  }

  async createParticipantRelation(
    participant: ParticipantNode,
    summonerName: string
  ): Promise<SummonerNode | undefined> {
    return this.neo4jService
      .write(
        `
            MATCH (target:Summoner {summonerName: $summonerName})
            MATCH (current:Participant {id: $participantId})

            MERGE (current)-[r:ACTED_AS]->(target)
            ON CREATE SET r.createdAt = datetime()

            RETURN target
        `,
        { summonerName, participantId: participant.getId() }
      )
      .then((res) => {
        if (res.records.length == 0) return undefined

        return new SummonerNode(res.records[0].get('target'))
      })
  }

  async findAll(): Promise<ParticipantNode[]> {
    return this.neo4jService
      .read(
        `
            MATCH (p:Participant)
            RETURN p
        `
      )
      .then((res) =>
        res.records.map((record) => new ParticipantNode(record.get('p')))
      )
  }

  async findOne(id: number): Promise<ParticipantNode> {
    return await this.neo4jService
      .read(
        `
            MATCH (p:Participant {id: $id})
            RETURN p
        `,
        { id }
      )
      .then((res) => new ParticipantNode(res.records[0].get('p')))
  }

  async update(
    id: number,
    updateParticipantDto: UpdateParticipantDto
  ): Promise<ParticipantNode> {
    return await this.neo4jService
      .write(
        `
            MATCH (p:Participant {id: $id})
            SET p += $updateParticipantDto
            RETURN p
        `,
        { id, updateParticipantDto }
      )
      .then((res) => new ParticipantNode(res.records[0].get('p')))
  }

  async remove(id: number): Promise<void> {
    await this.neo4jService.write(
      `
            MATCH (p:Participant {id: $id})
            DETACH DELETE p
        `,
      { id }
    )
  }
}
