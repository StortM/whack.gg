/* ('MIDDLE'),
('TOP'),
('BOTTOM'),
('JUNGLE'),
('UTILITY'),
# APEX?
('APEX'),
# MAYBE FOR ARAM GAMES
('NONE'); */
import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { Position } from '../position.entity'

export default class CreatePosition implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const test: Partial<Position>[] = [
      { name: 'MIDDLE' },
      { name: 'TOP' },
      { name: 'JUNGLE' },
      { name: 'BOTTOM' },
      { name: 'UTILITY' },
      { name: 'APEX' },
      { name: 'NONE' }
    ]

    await connection
      .createQueryBuilder()
      .insert()
      .into(Position)
      .values(test)
      .execute()
  }
}
