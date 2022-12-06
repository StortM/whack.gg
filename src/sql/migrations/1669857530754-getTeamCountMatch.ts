import { MigrationInterface, QueryRunner } from 'typeorm'

export class getTeamCountMatch1669857530754 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE OR REPLACE VIEW ChampionBanRate as
        SELECT c.name, COUNT(*) as ban_amount
        FROM teams_bans_champions
        JOIN champion c ON teams_bans_champions."championId" = c.id
        GROUP BY c.name
        ORDER BY ban_amount DESC
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP VIEW ChampionBanRate;
      `)
  }
}
