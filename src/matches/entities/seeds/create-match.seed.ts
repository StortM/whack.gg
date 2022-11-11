import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Match } from '../match.entity'
import { Gamemode } from 'src/gamemodes/entities/gamemodes.entity'

export default class CreateMatches implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const matches: Partial<Match>[] = [
      { id: 1, duration: 1590, gameMode: 20, gameCreation: 1664189971916 },
      { id: 2, duration: 1435, gameMode: 1, gameCreation: 1664184477742 }
    ]

    const gameModes = await connection.getRepository(Gamemode).find()
    console.log(gameModes)

    await connection.transaction(async (transactionalEntityManager) => {
      transactionalEntityManager
        .createQueryBuilder()
        .insert()
        .into(Match)
        .values(matches)
        .execute()
    })
  }
}
