import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { Division } from '../division.entity'

export default class CreateDivisions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const test: Partial<Division>[] = [
      { id: 1, name: 'IRON' },
      { id: 2, name: 'BRONZE' },
      { id: 3, name: 'SILVER' },
      { id: 4, name: 'GOLD' },
      { id: 5, name: 'PLATINUM' },
      { id: 6, name: 'DIAMOND' },
      { id: 7, name: 'MASTER' },
      { id: 8, name: 'GRANDMASTER' },
      { id: 9, name: 'CHALLENGER' }
    ]
    await connection.manager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager
        .createQueryBuilder()
        .insert()
        .into(Division)
        .values(test)
        .execute()
    })
  }
}
