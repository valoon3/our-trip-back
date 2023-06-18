import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginRequestDto } from './dto/login.request.dto';
import { UserRepository } from '../user/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './jwt/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserRepository))
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService, // AuthModule 의 JwtModule 에서 공급받아서 사용
  ) {}

  async createToken({ email, password }: LoginRequestDto) {
    // 이메일과 비밀번호의 포맷이 옳바른지 검증
    this.validateLoginForm(email, password);

    const user = await this.userRepository.findOneByUserEmail(email);
    await this.verifyPassword(password, user.password);

    const payload: Payload = {
      sub: user.id.toString(), // 토큰 제목
      email: user.email,
      name: user.name,
    };

    return await this.jwtService.signAsync(payload); // 토큰 생성하여 발급 완료
  }

  private validateLoginForm(email: string, password: string) {
    const errors: any = {};

    if (email.length === 0) errors.emailError = '이메일을 입력해주세요.';
    if (password.length === 0)
      errors.passwordError = '비밀번호를 입력해주세요.';

    if (Object.keys(errors).length > 0) throw new BadRequestException(errors);
  }

  private async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean | unknown> {
    const isPasswordValidated = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 다시 확인해주세요', {
        cause: new Error(),
        description: '이메일과 비밀번호를 확인해주세요.',
      });
    }

    return isPasswordValidated;
  }
}
