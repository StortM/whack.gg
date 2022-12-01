import { MigrationInterface, QueryRunner } from 'typeorm'

export class EnsureOnlyTwoTeamPrMatch1669863332490
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    CREATE TRIGGER EnsureOnlyTwoTeamPrMatch
    AFTER INSERT ON team
    FOR EACH ROW
    EXECUTE FUNCTION checkTeamCount()`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      DROP TRIGGER EnsureOnlyTwoTeamPrMatch on team;
      `)
  }
}
