import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Submission } from 'src/domain/submission';
import { SubmissionEntity } from 'src/infrastructure/repository/entities/submission.entity';
import { ISubmissionRepository } from 'src/service/interface/submissionRepository.interface';
import { SubmissionMediaEntity } from 'src/infrastructure/repository/entities/submissionMedia.entity';

@Injectable()
export class SubmissionRepository implements ISubmissionRepository {
  constructor(
    @Inject('CV_DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {}

  async save(submission: Submission): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      await manager
        .createQueryBuilder()
        .insert()
        .into(SubmissionEntity)
        .values({ ...submission })
        .execute();

      if (submission.submissionMedia) {
        await manager
          .createQueryBuilder()
          .insert()
          .into(SubmissionMediaEntity)
          .values({ ...submission.submissionMedia })
          .execute();
      }
    });
  }
}
