import { Module } from '@nestjs/common';
import { RepositoryModule } from './repository/repository.module';
import { MediaUploaderModule } from './mediaUploader/mediaUploader.module';

@Module({
  imports: [RepositoryModule, MediaUploaderModule],
})
export class InfrastructureModule {}
