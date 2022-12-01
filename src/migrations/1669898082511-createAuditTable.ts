import { MigrationInterface, QueryRunner } from 'typeorm'

export class createAuditTable1669898082511 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE IF NOT EXISTS audit_matches(
            id INT PRIMARY KEY NOT NULL,
            matches_played int NOT NULL,
            day VARCHAR(15)
        )
      `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('DROP TABLE audit_matches')
  }
}
