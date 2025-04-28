import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './database.config';
import azureConfig from './azure.config';
import authConfig from 'src/common/config/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, azureConfig, authConfig],
    }),
  ],
})
export class ConfigurationModule {}
