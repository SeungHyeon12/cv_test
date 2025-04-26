import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { SubmissionEvaluationController } from './controller/submissionEvaluation.controller';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  controllers: [SubmissionEvaluationController],
  imports: [CommonModule, InfrastructureModule],
})
export class AppModule {}
