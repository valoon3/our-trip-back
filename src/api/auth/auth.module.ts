import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import * as process from 'process';
import { ConfigService } from '@nestjs/config';
import { jwtSecret } from './jwt/jwtSecret';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    // 인증에 대한 설정 : Passport Strategy 의 기본적인 설정

    JwtModule.register({
      // 로그인할 때 사용
      secret: 'secret',
      signOptions: { expiresIn: '7d' },
    }),

    forwardRef(() => UserModule), // UserModule 의 exports 리스트를 사용 가능하도록 만들어준다.
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
