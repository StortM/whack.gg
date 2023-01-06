import { MigrationInterface, QueryRunner } from 'typeorm'

export class createAuditPositionTrigger1673004121185
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TRIGGER audit_position_trigger
    AFTER INSERT OR UPDATE OR DELETE ON position
    FOR EACH ROW
    EXECUTE FUNCTION POSITION_AUDIT_INFO();
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TRIGGER audit_position_trigger on position;`)
  }
}
