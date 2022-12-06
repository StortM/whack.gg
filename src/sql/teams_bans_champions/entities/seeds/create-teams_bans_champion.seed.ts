import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { TeamsBansChampions } from '../teams_bans_champions.entity'

export default class CreateTeamsBansChampions implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const teams: Partial<TeamsBansChampions>[] = [
      { id: 1, teamId: 1, championId: 5 },
      { id: 2, teamId: 1, championId: 6 },
      { id: 3, teamId: 1, championId: 7 },
      { id: 4, teamId: 1, championId: 8 },
      { id: 5, teamId: 1, championId: 9 },
      { id: 6, teamId: 2, championId: 10 },
      { id: 7, teamId: 2, championId: 11 },
      { id: 8, teamId: 2, championId: 12 },
      { id: 9, teamId: 2, championId: 13 },
      { id: 10, teamId: 2, championId: 14 },
      { id: 11, teamId: 3, championId: 15 },
      { id: 12, teamId: 3, championId: 10 },
      { id: 13, teamId: 3, championId: 16 },
      { id: 14, teamId: 3, championId: 17 },
      { id: 15, teamId: 3, championId: 18 },
      { id: 16, teamId: 4, championId: 14 },
      { id: 17, teamId: 4, championId: 18 },
      { id: 18, teamId: 4, championId: 16 },
      { id: 19, teamId: 4, championId: 19 },
      { id: 20, teamId: 4, championId: 20 }
    ]

    await connection.transaction(async (transactionalEntityManager) => {
      transactionalEntityManager
        .createQueryBuilder()
        .insert()
        .into(TeamsBansChampions)
        .values(teams)
        .execute()
    })
  }
}
