import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // JWT 가 Req 의 header 에서 추출되는 방법을 제공 // 스키마 bearer 를 사용하여 인증 헤더에서 JWT 를 찾는다
      secretOrKey: 'secret',
      // 토큰 설명을 위해 대칭 비밀키를 제공하는 옵션
      ignoreExpiration: false,
      // true 의 경우 토큰의 수명이 만료될 경우 401 error 호출한다.
    });
  }

  // Guard 가 Strategy 호출하고 Strategy 는 validate() 를 호출한다.
  // frontEnd 에서 날아온 jwt 가
  async validate(payload) {
    // return this.authService.singIn(email, password);
  }
}
