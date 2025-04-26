import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import azureConfig from 'src/common/config/azure.config';
import { AzureAIProcessor } from './azureAIProcessor';

@Module({
  imports: [ConfigModule.forFeature(azureConfig)],
  providers: [
    {
      provide: 'AI_PROCESSOR',
      useClass: AzureAIProcessor,
    },
  ],
  exports: ['AI_PROCESSOR'],
})
export class AIProcessorModule {}
