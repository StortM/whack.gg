import { MigrationInterface, QueryRunner } from 'typeorm'

export class getSummonerFullRank1669843613493 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    CREATE or REPLACE procedure getFullSummonerRankByName(
        srName VARCHAR(255)
     )
     LANGUAGE plpgsql    
     AS $$
     BEGIN
         PERFORM summoner."summonerName" AS summoner_name, getFullSummonerRank(division.name, tier.value) as rank, rank.lp as league_points
         FROM summoner
         JOIN rank on summoner."rankId" = rank.id
         JOIN tier on rank."tierId" = tier.Id
         JOIN division on rank."divisionId" = division.Id
         WHERE summoner."summonerName" = srName;
         COMMIT;
     END;$$
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('DROP PROCEDURE getFullSummonerRankByName;')
  }
}
