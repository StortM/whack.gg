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
