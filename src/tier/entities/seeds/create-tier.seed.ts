import { query } from 'express'
import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { Tier } from '../tier.entity'

export default class CreateTier implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const queryRunner = await connection.createQueryRunner()
    const test: Partial<Tier>[] = [
      { value: 'I' },
      { value: 'II' },
      { value: 'VI' },
      { value: 'V' }
    ]

    await connection
      .createQueryBuilder()
      .insert()
      .into(Tier)
      .values(test)
      .execute()
  }
}
