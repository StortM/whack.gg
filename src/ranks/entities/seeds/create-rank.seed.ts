import { query } from 'express'
import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { Rank } from '../rank.entity'

export default class CreateTier implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const queryRunner = await connection.createQueryRunner()
    const ranks: Partial<Rank>[] = [
      { id: 1, lp: 1030, division: 9, tier: 1 },
      { id: 2, lp: 78, division: 5, tier: 1 },
      { id: 3, lp: 780, division: 8, tier: 1 }
    ]
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
