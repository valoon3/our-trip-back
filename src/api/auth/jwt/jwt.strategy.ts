import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  HttpException,
  HttpStatus,
  Injectable,
  Next,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { UserRepository } from '../../user/user.repository';
import { Payload } from './jwt.payload';

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies['token']) {
    token = req.cookies['token'] || req.header;
  } else {
    throw new UnauthorizedException('UNAUTHORIZED', {
      cause: new Error(),
      description: '로그인이 필요합니다.',
    });
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {
    super({
      // todo : jwtFromRequest 에 대해서 더 알아보자
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: cookieExtractor,
      // JWT 가 Req 의 header 에서 추출되는 방법을 제공 // 스키마 bearer 를 사용하여 인증 헤더에서 JWT 를 찾는다
      secretOrKey: 'secret',
      // 토큰 설명을 위해 대칭 비밀키를 제공하는 옵션
      ignoreExpiration: false,
      // true 의 경우 토큰의 수명이 만료될 경우 401 error 호출한다.
      failureRedirect: '/user/logout',
    });
  }

  // Guard 가 Strategy 호출하고 Strategy 는 validate() 를 호출한다.
  // frontEnd 에서 날아온 jwt 가
  async validate(payload: Payload) {
    if (payload == null) {
      console.log('asdf');
    }

    return await this.userRepository.findOneByUserId(payload.sub);
  }
}
