import { MigrationInterface, QueryRunner } from 'typeorm'

export class auditingTrigger1672868333106 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS AUDIT_TIER(
      OP CHAR(1) NOT NULL,
      STAMP TIMESTAMP NOT NULL,
      USER_ID CHAR(20) NOT NULL,
      VALUE VARCHAR(25)
    );
    CREATE INDEX IF NOT EXISTS AUDIT_TIER_STAMP ON AUDIT_TIER(STAMP);
  `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE AUDIT_TIER;')
  }
}
