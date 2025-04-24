import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { RepositoryModule } from './infrastructure/repository/repository.module';
import { SubmissionEvaluationController } from './controller/submissionEvaluation.controller';

@Module({
  controllers: [SubmissionEvaluationController],
  imports: [CommonModule, RepositoryModule],
})
export class AppModule {}
