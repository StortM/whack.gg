import { MigrationInterface, QueryRunner } from 'typeorm'

export class test1669843047590 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    create or replace function GetFullSummonerRank(tier varchar(50), division varchar(20))
    returns varchar(10)
    language plpgsql
    as $$
    declare
      summonerRank varchar;
    Begin
      SELECT tier ||' '|| division
      INTO summonerRank;
      
      return summonerRank;
    end; $$
      `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP GetFullSummonerRank if exists`)
  }
}
