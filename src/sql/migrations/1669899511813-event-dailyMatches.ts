import { MigrationInterface, QueryRunner } from 'typeorm'

export class eventDailyMatches1669899511813 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE OR REPLACE PROCEDURE insert_daily_match_count()
        LANGUAGE plpgsql
        AS $$
        DECLARE
            matches_played int;
        BEGIN
            matches_played := (SELECT COUNT(*) FROM match WHERE 
            to_timestamp(match."gameCreation" / 1000)::date = now());
            INSERT INTO audit_matches VALUES(0, matches_played, now()::date);
            COMMIT;
        END;$$
      `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('DROP PROCEDURE insert_daily_match_count')
  }
}
