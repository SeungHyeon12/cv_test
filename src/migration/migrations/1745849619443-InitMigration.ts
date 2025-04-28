import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1745849619443 implements MigrationInterface {
  name = 'InitMigration1745849619443';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "students" ("id" character(26) NOT NULL, "name" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "submission_media" ("id" character(26) NOT NULL, "submission_id" character(26) NOT NULL, "video_url" text, "audio_url" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_2e9be2f1f37d7a484e38f4ce78" UNIQUE ("submission_id"), CONSTRAINT "PK_4a2ad30a956a44dba4cf46d1967" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "submissions" ("id" character(26) NOT NULL, "student_id" character(26) NOT NULL, "component_type" character varying(100) NOT NULL, "submit_text" text NOT NULL, "status" character varying(50) NOT NULL, "score" integer NOT NULL, "result" jsonb, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_10b3be95b8b2fb1e482e07d706b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "submission_media" ADD CONSTRAINT "FK_2e9be2f1f37d7a484e38f4ce78e" FOREIGN KEY ("submission_id") REFERENCES "submissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "submission_media" DROP CONSTRAINT "FK_2e9be2f1f37d7a484e38f4ce78e"`,
    );
    await queryRunner.query(`DROP TABLE "submissions"`);
    await queryRunner.query(`DROP TABLE "submission_media"`);
    await queryRunner.query(`DROP TABLE "students"`);
  }
}
