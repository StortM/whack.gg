import { CryptService } from 'src/sql/crypt/crypt.service'
import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { Summoner } from '../summoner.entity'

export default class CreateSummoners implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const cryptService = new CryptService()

    // create 3 hashed passwords
    const hashedPass1 = await cryptService.hash('test1')
    const hashedPass2 = await cryptService.hash('test2')
    const hashedPass3 = await cryptService.hash('test3')

    const summoners: Partial<Summoner>[] = [
      {
        id: 1,
        summonerName: 'KHK TLamp'.toLowerCase().trim(),
        level: 685,
        icon: 1389,
        regionId: 1,
        rankId: 1,
        passwordHash: hashedPass1,
        isAdmin: true
      },
      {
        id: 2,
        summonerName: 'Dayns'.toLowerCase().trim(),
        level: 664,
        icon: 549,
        regionId: 1,
        rankId: 2,
        passwordHash: hashedPass2,
        isAdmin: false
      },
      {
        id: 3,
        summonerName: 'DrÎ±chun'.toLowerCase().trim(),
        level: 419,
        icon: 2092,
        regionId: 1,
        rankId: 3,
        passwordHash: hashedPass3,
        isAdmin: false
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
