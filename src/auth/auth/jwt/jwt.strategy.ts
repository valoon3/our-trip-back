import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catRepositroy) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // JWT 가 Req 에서 추출되는 방법을 제공 // 스키마 bearer 를 사용하여 인증 헤더에서 JWT 를 찾는다
      secretOrKey: 'secret', // 토큰 설명을 위해 대칭 비밀키를 제공하는 옵션
      ignoreExpiration: false, // true 의 경우 토큰의 수명이 만료될 경우 401 error 호출한다.
    });
  }

  async validate(payload) {
    const cat = await this.catRepositroy.findByCatIdWithoutPassword(
      payload.sub,
    );

    if (!cat) {
      throw new UnauthorizedException('고양이가 존재하지 않습니다.');
    }

    return cat;
  }
}
