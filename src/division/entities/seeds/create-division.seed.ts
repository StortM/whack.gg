import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { Division } from '../division.entity'

export default class CreateDivision implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const test: Partial<Division>[] = [
      { name: 'IRON' },
      { name: 'SILVER' },
      { name: 'GOLD' },
      { name: 'PLATINUM' },
      { name: 'DIAMOND' },
      { name: 'MASTER' },
      { name: 'GRANDMASTER' },
      { name: 'CHALLENGER' }
    ]

    await connection
      .createQueryBuilder()
      .insert()
      .into(Division)
      .values(test)
      .execute()

    /* await connection.manager.transaction(async (transactionalEntityManager) => {
      test.forEach((item) => {
        transactionalEntityManager
          .insert(Division, item)
          .catch((error) => {
            console.error(error)
          })
          .finally(() => {
            transactionalEntityManager.release()
          })
      })
    }) */
  }
}
