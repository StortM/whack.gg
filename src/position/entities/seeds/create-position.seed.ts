import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { Position } from '../position.entity'

export default class CreatePositions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const test: Partial<Position>[] = [
      { id: 1, name: 'MIDDLE' },
      { id: 2, name: 'TOP' },
      { id: 4, name: 'JUNGLE' },
      { id: 5, name: 'BOTTOM' },
      { id: 6, name: 'UTILITY' },
      { id: 7, name: 'APEX' },
      { id: 8, name: 'NONE' }
    ]
    await connection.manager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager
        .createQueryBuilder()
        .insert()
        .into(Position)
        .values(test)
        .execute()
    })
  }
}
