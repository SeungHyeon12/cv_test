import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { RepositoryModule } from './infrastructure/repository/repository.module';

@Module({
  imports: [CommonModule, RepositoryModule],
})
export class AppModule {}
