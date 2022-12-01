import { MigrationInterface, QueryRunner } from 'typeorm'

export class checkTeamCountFunction1669863122867 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    CREATE OR REPLACE FUNCTION checkTeamCount() 
    RETURNS trigger 
    LANGUAGE plpgsql
    AS $$
        DECLARE
        team_count int;
        BEGIN
        team_count := (SELECT COUNT(*) FROM team WHERE team."matchId" = NEW."matchId");
        IF team_count > 2 THEN
        RAISE NOTICE 'YOU CAN ONLY ASSIGN TWO TEAMS PER MATCH!';
        RETURN NEW;
        END IF;
        RETURN null;
        END;
    $$`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP FUNCTION checkTeamCount()`)
  }
}
