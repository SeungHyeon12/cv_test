import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1745741215325 implements MigrationInterface {
    name = 'InitMigration1745741215325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" DROP CONSTRAINT "FK_b59a1b5e2a39b3cc2eb64fcda0e"`);
        await queryRunner.query(`ALTER TABLE "submissions" DROP CONSTRAINT "REL_b59a1b5e2a39b3cc2eb64fcda0"`);
        await queryRunner.query(`ALTER TABLE "submissions" DROP COLUMN "submission_media_id"`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD CONSTRAINT "FK_10b3be95b8b2fb1e482e07d706b" FOREIGN KEY ("id") REFERENCES "submission_media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" DROP CONSTRAINT "FK_10b3be95b8b2fb1e482e07d706b"`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD "submission_media_id" character(26)`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD CONSTRAINT "REL_b59a1b5e2a39b3cc2eb64fcda0" UNIQUE ("submission_media_id")`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD CONSTRAINT "FK_b59a1b5e2a39b3cc2eb64fcda0e" FOREIGN KEY ("submission_media_id") REFERENCES "submission_media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
