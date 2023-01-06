import { MigrationInterface, QueryRunner } from 'typeorm'

export class createAuditDivisionInfo1673002195280
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE OR REPLACE FUNCTION DIVISION_AUDIT_INFO()
        RETURNS TRIGGER
        AS
        $AUDIT_DIVISION$
        BEGIN
        IF(TG_OP = 'DELETE') THEN
            INSERT INTO AUDIT_DIVISION VALUES ('D', now(), user, OLD.name);
            RAISE NOTICE 'DELETE OPERATION INTO AUDIT_DIVISION';
        ELSEIF (TG_OP = 'UPDATE') THEN
		    RAISE NOTICE 'UPDATE OPERATION INTO AUDIT_DIVISION';
            INSERT INTO AUDIT_DIVISION VALUES ('U', now(), user, NEW.name);
        ELSEIF (TG_OP = 'INSERT') THEN
            INSERT INTO AUDIT_DIVISION VALUES ('I', now(), user, NEW.name);
            RAISE NOTICE 'INSERT OPERATION INTO AUDIT_DIVISION';
        END IF;
            RETURN NULL;
        END;
        $AUDIT_DIVISION$
        LANGUAGE plpgsql;
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP FUNCTION DIVISION_AUDIT_INFO;')
  }
}
