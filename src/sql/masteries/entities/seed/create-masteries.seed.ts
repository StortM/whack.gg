import { Champion } from 'src/sql/champions/entities/champion.entity'
import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { Mastery } from '../mastery.entity'

export default class CreateMasteries implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const masteries: Partial<Mastery>[] = [
      {
        id: 1,
        level: 7,
        championPoints: 508660,
        summonerId: 2,
        championId: 20,
        lastPlayed: 1668272025000
      },
      {
        id: 2,
        level: 7,
        championPoints: 216866,
        lastPlayed: 1665337007000,
        championId: 1,
        summonerId: 2
      },
      {
        id: 3,
        level: 7,
        championPoints: 601800,
        lastPlayed: 1664453274000,
        championId: 20,
        summonerId: 2
      }
    ]

    await connection.transaction(async (transactionalEntityManager) => {
      transactionalEntityManager
        .createQueryBuilder()
        .insert()
        .into(Mastery)
        .values(masteries)
        .execute()
    })
  }
}
