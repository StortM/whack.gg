import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { Rank } from '../rank.entity'

export default class CreateRanks implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const ranks: Partial<Rank>[] = [
      { id: 1, lp: 1030, divisionId: 9, gameModeId: 1, tierId: 1 },
      { id: 2, lp: 78, divisionId: 5, gameModeId: 1, tierId: 1 },
      { id: 3, lp: 780, divisionId: 8, gameModeId: 1, tierId: 1 }
    ]

    console.log(`\n${ranks} `)
    await connection.transaction(async (transactionalManager) => {
      transactionalManager
        .createQueryBuilder()
        .insert()
        .into(Rank)
        .values(ranks)
        .execute()
    })
  }
}
