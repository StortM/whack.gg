import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Gamemode } from '../gamemodes.entity'
export default class CreateGameModes implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const gamemodes: Partial<Gamemode>[] = [
      { id: 1, name: 'CLASSIC' },
      { id: 2, name: 'ODIN' },
      { id: 3, name: 'ARAM' },
      { id: 4, name: 'TUTORIAL' },
      { id: 5, name: 'URF' },
      { id: 6, name: 'DOOMBOTSTEEMO' },
      { id: 7, name: 'ONEFORALL' },
      { id: 8, name: 'ASCENSION' },
      { id: 9, name: 'FIRSTBLOOD' },
      { id: 10, name: 'KINGPORO' },
      { id: 11, name: 'SIEGE' },
      { id: 12, name: 'ASSASINATE' },
      { id: 13, name: 'ARSR' },
      { id: 14, name: 'DARKSTAR' },
      { id: 15, name: 'STARGUARDIAN' },
      { id: 16, name: 'PROJECT' },
      { id: 17, name: 'GAMEMODEX' },
      { id: 18, name: 'ODYSSEY' },
      { id: 19, name: 'NEXUSBLITZ' },
      { id: 20, name: 'ULTBOOK' }
    ]

    await connection.transaction(async (transactionalEntityManager) => {
      transactionalEntityManager
        .createQueryBuilder()
        .insert()
        .into(Gamemode)
        .values(gamemodes)
        .execute()
    })
  }
}
