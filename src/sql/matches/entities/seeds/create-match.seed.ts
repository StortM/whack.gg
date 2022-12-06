import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { Match } from '../match.entity'

export default class CreateMatches implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const matches: Partial<Match>[] = [
      { id: 1, duration: 1590, gameModeId: 20, gameCreation: 1664189971916 },
      { id: 2, duration: 1435, gameModeId: 1, gameCreation: 1664184477742 }
    ]

    await connection.transaction(async (transactionalEntityManager) => {
      transactionalEntityManager
        .createQueryBuilder()
        .insert()
        .into(Match)
        .values(matches)
        .execute()
    })
  }
}
