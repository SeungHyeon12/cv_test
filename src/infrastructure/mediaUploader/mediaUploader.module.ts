import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import azureConfig from 'src/common/config/azure.config';
import { MediaUploadProcessor } from './mediaUploadProcessor';

@Module({
  imports: [ConfigModule.forFeature(azureConfig)],
  providers: [
    {
      provide: 'MEDIA_UPLOADER',
      useClass: MediaUploadProcessor,
    },
  ],
  exports: ['MEDIA_UPLOADER'],
})
export class MediaUploaderModule {}
