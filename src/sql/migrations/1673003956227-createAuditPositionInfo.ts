import { MigrationInterface, QueryRunner } from 'typeorm'

export class createAuditPositionInfo1673003956227
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE OR REPLACE FUNCTION POSITION_AUDIT_INFO()
    RETURNS TRIGGER
    AS
    $AUDIT_POSITION$
    BEGIN
    IF(TG_OP = 'DELETE') THEN
        INSERT INTO AUDIT_POSITION VALUES ('D', now(), user, OLD.name);
        RAISE NOTICE 'DELETE OPERATION INTO AUDIT_POSITION';
    ELSEIF (TG_OP = 'UPDATE') THEN
        RAISE NOTICE 'UPDATE OPERATION INTO AUDIT_POSITION';
        INSERT INTO AUDIT_POSITION VALUES ('U', now(), user, NEW.name);
    ELSEIF (TG_OP = 'INSERT') THEN
        INSERT INTO AUDIT_POSITION VALUES ('I', now(), user, NEW.name);
        RAISE NOTICE 'INSERT OPERATION INTO AUDIT_POSITION';
    END IF;
        RETURN NULL;
    END;
    $AUDIT_POSITION$
    LANGUAGE plpgsql;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP FUNCTION POSITION_AUDIT_INFO;`)
  }
}
