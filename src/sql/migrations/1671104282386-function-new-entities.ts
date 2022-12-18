import { MigrationInterface, QueryRunner } from 'typeorm'

export class functionNewEntities1671104282386 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    CREATE OR REPLACE FUNCTION check_new_entities()
    RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    DECLARE
    type VARCHAR(20);
    message VARCHAR(255);
    champion_count int;
    BEGIN
    champion_count := (SELECT COUNT(*) FROM champion WHERE champion.name = new.name);
    IF champion_count < 1 THEN
    type := 'Champion Table';
    message := 'New champion has been added into our database' + new.name;
    RAISE NOTICE 'NEW CHAMPION COMING THROUGH.';
    INSERT INTO audit_log (type, message) VALUES (type, message);
    RETURN NEW;
	END IF;
	RETURN NULL;
    END;$$
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
