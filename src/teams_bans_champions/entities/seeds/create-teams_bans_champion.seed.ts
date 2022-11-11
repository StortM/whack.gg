import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { TeamsBansChampions } from '../teams_bans_champions.entity'

/* 
 (1, 1, 360),
    (1, 1, 35),
    (1, 1, 114),
    (1, 1, 11),
    (2, 1, 200),
    (2, 1, 33),
    (2, 1, 67),
    (2, 1, 777),
    (2, 1, 120),
    (3, 2, 2),
    (3, 2, 200),
    (3, 2, 77),
    (3, 2, 517),
    (3, 2, 55),
    (4, 2, 120),
    (4, 2, 122),
    (4, 2, 77),
    (4, 2, 40),
    (4, 2, 119); */
export default class CreateTeamsBansChampions implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const teams: Partial<TeamsBansChampions>[] = [
      { id: 1, team: 1, match: 1, champion: 360 },
      { id: 2, team: 1, match: 1, champion: 35 },
      { id: 3, team: 1, match: 1, champion: 114 },
      { id: 4, team: 1, match: 1, champion: 11 },
      { id: 5, team: 2, match: 1, champion: 200 },
      { id: 6, team: 2, match: 1, champion: 33 },
      { id: 7, team: 2, match: 1, champion: 67 },
      { id: 8, team: 2, match: 1, champion: 777 },
      { id: 9, team: 2, match: 2, champion: 120 },
      { id: 10, team: 3, match: 2, champion: 2 },
      { id: 11, team: 3, match: 2, champion: 200 },
      { id: 12, team: 3, match: 2, champion: 77 },
      { id: 13, team: 3, match: 2, champion: 517 },
      { id: 14, team: 3, match: 2, champion: 55 },
      { id: 15, team: 4, match: 2, champion: 120 },
      { id: 16, team: 4, match: 2, champion: 122 },
      { id: 17, team: 4, match: 2, champion: 77 },
      { id: 18, team: 4, match: 2, champion: 40 },
      { id: 19, team: 4, match: 2, champion: 119 }
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
