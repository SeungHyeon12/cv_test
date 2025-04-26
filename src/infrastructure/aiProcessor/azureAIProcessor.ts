import { Inject, Injectable } from '@nestjs/common';
import azureConfig from 'src/common/config/azure.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AzureAIProcessor {
  constructor(
    @Inject(azureConfig.KEY)
    private readonly config: ConfigType<typeof azureConfig>,
  ) {}
}
