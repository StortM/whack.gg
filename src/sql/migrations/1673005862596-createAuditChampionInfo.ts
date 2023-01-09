import { MigrationInterface, QueryRunner } from 'typeorm'

export class createAuditChampionInfo1673005862596
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE OR REPLACE FUNCTION CHAMPION_AUDIT_INFO()
    RETURNS TRIGGER
    AS
    $AUDIT_CHAMPION$
    BEGIN
    IF(TG_OP = 'DELETE') THEN
        INSERT INTO AUDIT_CHAMPION VALUES ('D', now(), user, OLD.name);
        RAISE NOTICE 'DELETE OPERATION INTO AUDIT_CHAMPION';
    ELSEIF (TG_OP = 'UPDATE') THEN
        RAISE NOTICE 'UPDATE OPERATION INTO AUDIT_CHAMPION';
        INSERT INTO AUDIT_CHAMPION VALUES ('U', now(), user, NEW.name);
    ELSEIF (TG_OP = 'INSERT') THEN
        INSERT INTO AUDIT_CHAMPION VALUES ('I', now(), user, NEW.name);
        RAISE NOTICE 'INSERT OPERATION INTO AUDIT_CHAMPION';
    END IF;
        RETURN NULL;
    END;
    $AUDIT_CHAMPION$
    LANGUAGE plpgsql;`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP FUNCTION CHAMPION_AUDIT_INFO`)
  }
}
