import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginRequestDto } from './dto/login.request.dto';
import { UserRepository } from '../../api/user/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserRepository))
    private readonly userRepository: UserRepository,
  ) {}

  async singIn(email: string, password: string) {
    const user = await this.userRepository.findOneByUserEmail(email);

    if (!user) {
      throw new UnauthorizedException('이메일이 존재하지 않습니다.');
    }

    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요');
    }

    return 'jwt 로그인 토큰 전달하기';
  }
}
