import {
  BadRequestException,
  Body,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginRequestDto } from '../auth/dto/login.request.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signup(createUserDto: CreateUserDto) {
    const userExist = await this.userRepository.findOneByUserEmail(
      createUserDto.email,
    );

    const errors: any = {};

    if (userExist) {
      // TODO : exception filter 사용하기
      // throw new BadRequestException('email is exist!', {
      //   cause: new Error(),
      //   description: 'Some error description',
      // });
      errors.emailError = 'email is exist!';
      return errors;
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      Number(`${process.env.HASH_KEY}`),
    );

    createUserDto.password = hashedPassword;

    const { password, ...result } = await this.userRepository.signup(
      createUserDto,
    );

    return result;
  }

  // todo : AuthModule 에 있는 LoginReqestDto 를 사용하지 않고 중복되지 않도록 타입을 정의할 방법 찾기
  async signin(@Body() loginRequestDto: LoginRequestDto) {
    return this.authService.singIn(loginRequestDto);
  }

  // findAll() {
  //   return this.userRepository.fineAll();
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }
  //
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
