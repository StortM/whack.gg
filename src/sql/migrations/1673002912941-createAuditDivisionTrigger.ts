import { MigrationInterface, QueryRunner } from 'typeorm'

export class createAuditDivisionTrigger1673002912941
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TRIGGER audit_division_trigger
    AFTER INSERT OR UPDATE OR DELETE ON division
    FOR EACH ROW
    EXECUTE FUNCTION DIVISION_AUDIT_INFO();
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TRIGGER audit_division_trigger on division;')
  }
}
