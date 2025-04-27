import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1745741443428 implements MigrationInterface {
    name = 'InitMigration1745741443428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" DROP CONSTRAINT "FK_10b3be95b8b2fb1e482e07d706b"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" ADD CONSTRAINT "FK_10b3be95b8b2fb1e482e07d706b" FOREIGN KEY ("id") REFERENCES "submission_media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
