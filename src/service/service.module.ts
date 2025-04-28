import { Module } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { UserService } from 'src/service/user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigType } from '@nestjs/config';
import authConfig from 'src/common/config/auth.config';

@Module({
  imports: [
    InfrastructureModule,
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(authConfig)],
      inject: [authConfig.KEY],
      useFactory: async (config: ConfigType<typeof authConfig>) => ({
        secret: config.JWT_SECRET,
        signOptions: {
          expiresIn: '99h',
        },
      }),
    }),
  ],
  providers: [SubmissionService, UserService],
  exports: [SubmissionService, UserService],
})
export class ServiceModule {}
