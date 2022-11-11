import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Participant } from '../participant.entity'
export default class CreateTeamsBansChampions implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const participant: Partial<Participant>[] = [
      {
        id: 1,
        assists: 4,
        deaths: 11,
        kills: 3,
        baronKills: 0,
        consumablePurchased: 0,
        damageDealtToBuildings: 0,
        damageDealtToObjectives: 1311,
        damageDealtToTurrets: 0,
        damageSelfMitigated: 19712,
        doubleKills: 0,
        tripleKills: 0,
        quadraKills: 0,
        pentaKills: 0,
        teamId: 1,
        summonerId: 1,
        positionId: 1,
        championId: 2
      },
      {
        id: 2,
        assists: 8,
        deaths: 1,
        kills: 10,
        baronKills: 0,
        consumablePurchased: 6,
        damageDealtToBuildings: 16219,
        damageDealtToObjectives: 27796,
        damageDealtToTurrets: 16219,
        damageSelfMitigated: 7717,
        doubleKills: 1,
        tripleKills: 0,
        quadraKills: 0,
        pentaKills: 0,
        teamId: 4,
        summonerId: 1,
        positionId: 3,
        championId: 1
      },
      {
        id: 3,
        assists: 1,
        deaths: 4,
        kills: 2,
        baronKills: 0,
        consumablePurchased: 1,
        damageDealtToBuildings: 711,
        damageDealtToObjectives: 1844,
        damageDealtToTurrets: 711,
        damageSelfMitigated: 18197,
        doubleKills: 0,
        tripleKills: 0,
        quadraKills: 0,
        pentaKills: 0,
        teamId: 3,
        summonerId: 3,
        positionId: 2,
        championId: 4
      },
      {
        id: 4,
        assists: 3,
        deaths: 7,
        kills: 5,
        baronKills: 0,
        consumablePurchased: 1,
        damageDealtToBuildings: 8397,
        damageDealtToObjectives: 20281,
        damageDealtToTurrets: 8397,
        damageSelfMitigated: 38940,
        doubleKills: 0,
        tripleKills: 0,
        quadraKills: 0,
        pentaKills: 0,
        teamId: 1,
        summonerId: 2,
        positionId: 2,
        championId: 4
      }
    ]

    await connection.transaction(async (transactionalEntityManager) => {
      transactionalEntityManager
        .createQueryBuilder()
        .insert()
        .into(Participant)
        .values(participant)
        .execute()
    })
  }
}
