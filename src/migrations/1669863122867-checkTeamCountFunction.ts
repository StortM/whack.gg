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
        RAISE EXCEPTION 'YOU CAN ONLY ASSIGN TWO TEAMS PER MATCH!';
        RETURN null;
        END IF;
        RETURN NEW;
        END;
    $$`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP FUNCTION checkTeamCount()`)
  }
}
