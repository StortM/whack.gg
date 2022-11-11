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
