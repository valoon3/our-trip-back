import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserRepository } from '../../../api/user/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepositroy: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // JWT 가 Req 에서 추출되는 방법을 제공 // 스키마 bearer 를 사용하여 인증 헤더에서 JWT 를 찾는다
      secretOrKey: 'secret', // 토큰 설명을 위해 대칭 비밀키를 제공하는 옵션
      ignoreExpiration: false, // true 의 경우 토큰의 수명이 만료될 경우 401 error 호출한다.
    });
  }

  async validate(payload) {
    const user = await this.catRepositroy.findByCatIdWithoutPassword(
      payload.sub,
    );

    if (!user) {
      throw new UnauthorizedException('사용자가 존재하지 않습니다.');
    }

    return user;
  }
}
