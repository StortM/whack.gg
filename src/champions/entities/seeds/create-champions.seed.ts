import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import { Champion } from '../champion.entity'

export default class CreateChampions implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const champions: Partial<Champion>[] = [
      { id: 1, name: 'Caitlyn' },
      { id: 2, name: 'Katarina' },
      { id: 3, name: 'Yorick' },
      { id: 4, name: 'Warwick' },
      { id: 5, name: 'none' },
      { id: 6, name: 'Samira' },
      { id: 7, name: 'Shaco' },
      { id: 8, name: 'Fiora' },
      { id: 9, name: 'Master Yi' },
      { id: 10, name: "Bel'Veth" },
      { id: 11, name: 'Rammus' },
      { id: 12, name: 'Vayne' },
      { id: 13, name: 'Yone' },
      { id: 14, name: 'Hecarim' },
      { id: 15, name: 'Olaf' },
      { id: 16, name: 'Udyr' },
      { id: 17, name: 'Sylas' },
      { id: 18, name: 'Darius' },
      { id: 19, name: 'Janna' },
      { id: 20, name: 'Draven' }
    ]

    await connection.transaction(async (transactionalEntityManager) => {
      transactionalEntityManager
        .createQueryBuilder()
        .insert()
        .into(Champion)
        .values(champions)
        .execute()
    })
  }
}
