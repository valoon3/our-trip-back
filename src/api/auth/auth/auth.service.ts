import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginRequestDto } from './dto/login.request.dto';
import { UserRepository } from '../../user/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserRepository))
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async singIn(email: string, password: string) {
    // 이메일과 비밀번호의 포맷이 옳바른지 검증
    this.validateLoginForm(email, password);

    const user = await this.userRepository.findOneByUserEmail(email);
    await this.verifyPassword(password, user.password);

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
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
  ): Promise<void> {
    const isPasswordValidated = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 다시 확인해주세요', {
        cause: new Error(),
        description: '이메일과 비밀번호를 확인해주세요.',
      });
    }
  }
}
