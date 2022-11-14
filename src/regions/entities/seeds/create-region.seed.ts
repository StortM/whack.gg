import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { Region } from '../region.entity'

export default class CreateRegions implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const regions: Partial<Region>[] = [
      { id: 1, name: 'EUW' },
      { id: 2, name: 'NA' },
      { id: 3, name: 'LAN' },
      { id: 4, name: 'KR' }
    ]

    await connection.transaction(async (transactionalEntityManager) => {
      transactionalEntityManager
        .createQueryBuilder()
        .insert()
        .into(Region)
        .values(regions)
        .execute()
    })
  }
}
