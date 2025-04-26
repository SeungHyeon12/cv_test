import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { SubmissionEvaluationController } from './controller/submissionEvaluation.controller';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ServiceModule } from './service/service.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LatencyInterceptor } from './common/interceptor/latency.interceptor';
import { HttpExceptionFilter } from './common/filter/httpException.filter';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LatencyInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  controllers: [SubmissionEvaluationController],
  imports: [CommonModule, InfrastructureModule, ServiceModule],
})
export class AppModule {}
