import { MigrationInterface, QueryRunner } from 'typeorm'

export class test1669716825801 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    CREATE FUNCTION GetFullSummonerRank(tier varchar(10), division varchar(45)
    )
    RETURNS varchar as $$
    SELECT tier || ' ' || division as Result
    $$ LANGUAGE SQL;
      `)
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    DROP FUNCTION IF EXISTS GetFullSummonerRank;
      `)
  }
}
