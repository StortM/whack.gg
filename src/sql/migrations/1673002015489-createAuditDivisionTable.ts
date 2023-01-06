import { MigrationInterface, QueryRunner } from 'typeorm'

export class createAuditDivisionTable1673002015489
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE AUDIT_DIVISION(
        OP CHAR(1) NOT NULL,
        STAMP TIMESTAMP NOT NULL,
        USER_ID CHAR(20) NOT NULL,
        NAME VARCHAR(25)
    );`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE AUDIT_DIVISION;')
  }
}
