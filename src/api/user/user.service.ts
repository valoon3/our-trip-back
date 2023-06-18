import {
  BadRequestException,
  Body,
  forwardRef,
  Inject,
  Injectable,
  Res,
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
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const userExist = await this.userRepository.checkExistEmail(
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

    const { password, ...result } = await this.userRepository.createUser(
      createUserDto,
    );

    return result;
  }

  async signin(@Body() loginRequestDto: LoginRequestDto, @Res() res) {
    const token = await this.authService.createToken(loginRequestDto);
    res.setHeader('Authorization', 'Bearer ' + token);

    // todo : accessToken 만들기
    res.cookie('token', token, {
      httponly: true,
    });
    res.send({ message: 'jwt token success' });
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
