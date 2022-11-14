import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { Summoner } from '../summoner.entity'

export default class CreateTier implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const summoners: Partial<Summoner>[] = [
      {
        id: 1,
        name: 'KHK TLamp',
        level: 685,
        icon: 1389,
        regionId: 1,
        rankId: 1
      },
      {
        id: 2,
        name: 'Dayns',
        level: 664,
        icon: 549,
        regionId: 1,
        rankId: 2
      },
      {
        id: 3,
        name: 'DrÎ±chun',
        level: 419,
        icon: 2092,
        regionId: 1,
        rankId: 3
      }
    ]
    await connection.transaction(async (transactionalManager) => {
      transactionalManager
        .createQueryBuilder()
        .insert()
        .into(Summoner)
        .values(summoners)
        .execute()
    })
  }
}
