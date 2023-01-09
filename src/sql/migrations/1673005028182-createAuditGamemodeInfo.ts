import { MigrationInterface, QueryRunner } from 'typeorm'

export class createAuditGamemodeInfo1673005028182
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE OR REPLACE FUNCTION GAMEMODE_AUDIT_INFO()
        RETURNS TRIGGER
        AS
        $AUDIT_GAMEMODE$
        BEGIN
        IF(TG_OP = 'DELETE') THEN
            INSERT INTO AUDIT_GAMEMODE VALUES ('D', now(), user, OLD.name);
            RAISE NOTICE 'DELETE OPERATION INTO AUDIT_GAMEMODE';
        ELSEIF (TG_OP = 'UPDATE') THEN
            RAISE NOTICE 'UPDATE OPERATION INTO AUDIT_GAMEMODE';
            INSERT INTO AUDIT_GAMEMODE VALUES ('U', now(), user, NEW.name);
        ELSEIF (TG_OP = 'INSERT') THEN
            INSERT INTO AUDIT_GAMEMODE VALUES ('I', now(), user, NEW.name);
            RAISE NOTICE 'INSERT OPERATION INTO AUDIT_GAMEMODE';
        END IF;
            RETURN NULL;
        END;
        $AUDIT_GAMEMODE$
        LANGUAGE plpgsql;`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP FUNCTION GAMEMODE_AUDIT_INFO;')
  }
}
