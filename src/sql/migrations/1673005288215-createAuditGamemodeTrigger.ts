import { MigrationInterface, QueryRunner } from 'typeorm'

export class createAuditGamemodeTrigger1673005288215
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TRIGGER audit_gamemode_trigger
    AFTER INSERT OR UPDATE OR DELETE ON game_mode
    FOR EACH ROW
    EXECUTE FUNCTION GAMEMODE_AUDIT_INFO();
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(``)
  }
}
