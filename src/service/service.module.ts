import { Module } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  providers: [SubmissionService],
  exports: [SubmissionService],
})
export class ServiceModule {}
