import { MigrationInterface, QueryRunner } from 'typeorm'

export class createAuditTierTriggerFunction1672928605621
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TRIGGER audit_tier_trigger
        AFTER INSERT OR UPDATE OR DELETE ON tier
        FOR EACH ROW
        EXECUTE FUNCTION tier_audit_info();
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TRIGGER audit_tier_trigger on tier;`)
  }
}
