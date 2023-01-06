import { MigrationInterface, QueryRunner } from 'typeorm'

export class createAuditChampionTrigger1673006129489
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TRIGGER audit_champion_trigger
    AFTER INSERT OR UPDATE OR DELETE ON champion
    FOR EACH ROW
    EXECUTE FUNCTION champion_AUDIT_INFO();`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TRIGGER audit_champion_trigger`)
  }
}
