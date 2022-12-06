import { MigrationInterface, QueryRunner } from 'typeorm'

export class getSummonerFullRank1669843613493 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    CREATE OR REPLACE FUNCTION getFullSummonerRankByName(
        srName VARCHAR(255)
     )
     RETURNS TABLE (summonerName varchar, rank varchar, lp int)
     LANGUAGE plpgsql    
     AS $$
     BEGIN		 
		RETURN QUERY SELECT summoner."summonerName", GetFullSummonerRank(division.name, tier.value), rank.lp
		    FROM summoner
			JOIN rank on summoner."rankId" = rank.id
            JOIN tier on rank."tierId" = tier.Id
            JOIN division on rank."divisionId" = division.Id
            WHERE summoner."summonerName" = srName;
     END;$$
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('DROP PROCEDURE getFullSummonerRankByName;')
  }
}
