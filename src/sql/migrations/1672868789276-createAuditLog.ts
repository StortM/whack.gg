import { MigrationInterface, QueryRunner } from 'typeorm'

export class createAuditLog1672868789276 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE OR REPLACE FUNCTION TIER_AUDIT_INFO()
            RETURNS TRIGGER
            AS
            $AUDIT_TIER$
            BEGIN
            IF(TG_OP = 'DELETE') THEN
            INSERT INTO AUDIT_TIER VALUES ('D', now(), user, OLD.value);
            ELSEIF (TG_OP = 'UPDATE') THEN
			RAISE NOTICE 'UPDATE and INSERTED INTO AUDIT';
            INSERT INTO AUDIT_TIER SELECT 'U', now(), user, NEW.value;
            ELSEIF (TG_OP = 'INSERT') THEN
            INSERT INTO AUDIT_TIER SELECT 'I', now(), user, NEW.value;
            ELSEIF (TG_OP = 'TRUNCATE') THEN
            INSERT INTO AUDIT_TIER SELECT 'T', now(), user, NEW.value;
            END IF;
            RETURN NULL;
            END;
            $AUDIT_TIER$
            LANGUAGE plpgsql;

    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP FUNCTION TIER_AUDIT_INFO;')
  }
}
