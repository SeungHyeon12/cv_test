import { StudentEntity } from 'src/infrastructure/repository/entities/student.entity';
import { SubmissionEntity } from 'src/infrastructure/repository/entities/submission.entity';
import { SubmissionMediaEntity } from 'src/infrastructure/repository/entities/submissionMedia.entity';
import { DataSource } from 'typeorm';

export const MigrationDataSource = new DataSource({
  type: 'postgres' as const,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: [StudentEntity, SubmissionEntity, SubmissionMediaEntity],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
});
