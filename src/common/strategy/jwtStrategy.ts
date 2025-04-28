import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import authConfig from 'src/common/config/auth.config';
import { IStudentRepository } from 'src/service/interface/studentRepository.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
    @Inject('STUDENT_REPOSITORY')
    private readonly studentRepo: IStudentRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true, // sample 로 쓸거기 때문에 우선 만료기간 무기한
      secretOrKey: config.JWT_SECRET,
    });
  }
  async validate(payload: any) {
    const user = await this.studentRepo.findById(payload.sub as string);
    if (!user) throw new Error('unAuthorized');
    return { userId: payload.sub };
  }
}
