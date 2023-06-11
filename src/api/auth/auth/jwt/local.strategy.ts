import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // JWT 가 Req 에서 추출되는 방법을 제공 // 스키마 bearer 를 사용하여 인증 헤더에서 JWT 를 찾는다
      secretOrKey: 'secret', // 토큰 설명을 위해 대칭 비밀키를 제공하는 옵션
      ignoreExpiration: false, // true 의 경우 토큰의 수명이 만료될 경우 401 error 호출한다.
    });
  }

  async validate(email: string, password: string) {
    return this.authService.singIn(email, password);
  }
}
