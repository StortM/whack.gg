import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { Tier } from '../tier.entity'

export default class CreateTier implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const test: Partial<Tier>[] = [
      { id: 1, value: 'I' },
      { id: 2, value: 'II' },
      { id: 3, value: 'VI' },
      { id: 4, value: 'V' }
    ]

    await connection
      .createQueryBuilder()
      .insert()
      .into(Tier)
      .values(test)
      .execute()
  }
}
