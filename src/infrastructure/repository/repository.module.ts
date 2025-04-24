import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import databaseConfig from 'src/common/config/database.config';
import { DataSource } from 'typeorm';

@Module({
  imports: [ConfigModule.forFeature(databaseConfig)],
  providers: [
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
  exports: ['CV_DATA_SOURCE'],
})
export class RepositoryModule {}
