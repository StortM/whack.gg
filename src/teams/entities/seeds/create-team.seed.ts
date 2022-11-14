import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Team } from '../team.entity'

export default class CreateTeams implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const teams: Partial<Team>[] = [
      { id: 1, match: 1, matchWon: false },
      { id: 2, match: 1, matchWon: true },
      { id: 3, match: 2, matchWon: false },
      { id: 4, match: 2, matchWon: true }
    ]

    await connection.transaction(async (transactionalEntityManager) => {
      transactionalEntityManager
        .createQueryBuilder()
        .insert()
        .into(Team)
        .values(teams)
        .execute()
    })
  }
}
