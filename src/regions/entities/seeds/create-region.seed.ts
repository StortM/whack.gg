import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Region } from '../region.entity'
import { CryptService } from 'src/crypt/crypt.service'
import { runMain } from 'module'

export default class CreateRegions implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    //const cryptService = new CryptService()
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
