import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { AzureAIProcessor } from './aiProcessor/azureAIProcessor';
import { MediaUploadProcessor } from './mediaUploader/mediaUploadProcessor';
import { DataSource } from 'typeorm';
import azureConfig from 'src/common/config/azure.config';
import databaseConfig from 'src/common/config/database.config';

@Module({
  imports: [
    ConfigModule.forFeature(azureConfig),
    ConfigModule.forFeature(databaseConfig),
  ],
  providers: [
    {
      provide: 'AI_PROCESSOR',
      useClass: AzureAIProcessor,
    },
    {
      provide: 'MEDIA_UPLOADER',
      useClass: MediaUploadProcessor,
    },
    {
      provide: 'CV_DATA_SOURCE',
      useFactory: async (config: ConfigType<typeof databaseConfig>) => {
        const dataSource = new DataSource({
          ...config,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        });
        return dataSource.initialize();
      },
      inject: [databaseConfig.KEY],
    },
  ],
  exports: ['AI_PROCESSOR', 'MEDIA_UPLOADER'],
})
export class InfrastructureModule {}
