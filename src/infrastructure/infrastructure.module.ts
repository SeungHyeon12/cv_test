import { Module } from '@nestjs/common';
import { RepositoryModule } from './repository/repository.module';
import { MediaUploaderModule } from './mediaUploader/mediaUploader.module';
import { AIProcessorModule } from './aiProcessor/aiProcessor.module';

@Module({
  imports: [RepositoryModule, MediaUploaderModule, AIProcessorModule],
})
export class InfrastructureModule {}
