import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1745724788366 implements MigrationInterface {
    name = 'InitMigration1745724788366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "student" ("id" character(26) NOT NULL, "name" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "submission_media" ("id" character(26) NOT NULL, "submission_id" character(26) NOT NULL, "video_url" text, "audio_url" text, "metadata" jsonb, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_2e9be2f1f37d7a484e38f4ce78" UNIQUE ("submission_id"), CONSTRAINT "PK_4a2ad30a956a44dba4cf46d1967" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "submission" ("id" character(26) NOT NULL, "student_id" character(26) NOT NULL, "component_type" character varying(100) NOT NULL, "submit_text" text NOT NULL, "status" character varying(50) NOT NULL, "score" integer NOT NULL, "result" jsonb, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "submission_media_id" character(26), CONSTRAINT "REL_812976867bcc2039fb736f0f57" UNIQUE ("submission_media_id"), CONSTRAINT "PK_7faa571d0e4a7076e85890c9bd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "submission_media" ADD CONSTRAINT "FK_2e9be2f1f37d7a484e38f4ce78e" FOREIGN KEY ("submission_id") REFERENCES "submission"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submission" ADD CONSTRAINT "FK_812976867bcc2039fb736f0f57e" FOREIGN KEY ("submission_media_id") REFERENCES "submission_media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submission" DROP CONSTRAINT "FK_812976867bcc2039fb736f0f57e"`);
        await queryRunner.query(`ALTER TABLE "submission_media" DROP CONSTRAINT "FK_2e9be2f1f37d7a484e38f4ce78e"`);
        await queryRunner.query(`DROP TABLE "submission"`);
        await queryRunner.query(`DROP TABLE "submission_media"`);
        await queryRunner.query(`DROP TABLE "student"`);
    }

}
