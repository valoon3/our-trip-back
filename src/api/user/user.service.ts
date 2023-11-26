import {
  BadRequestException,
  Body,
  ConflictException,
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { AuthService } from '../auth/auth.service';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginResultDto } from './dto/login-result.dto';
import * as bcrypt from 'bcrypt';

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

    if (userExist) {
      throw new BadRequestException('email is exist!', {
        cause: new Error(),
        description: 'email is exist',
      });
    }

    const { password, ...result } = await this.userRepository.createUser(
      createUserDto,
    );

    return result;
  }

  async signin(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const loginResult = new LoginResultDto();

    const user = await this.userRepository.findOneByUserEmail(
      loginUserDto.email,
    );

    if (!user) {
      // throw new ConflictException('email is exist!', {
      //   cause: new Error(),
      //   description: 'email is exist',
      // });
      loginResult.loginError = '아이디가 일치하지 않습니다.';
      return res.status(203).json(loginResult);
    } else {
      loginResult.userInfo = user;
    }

    // const hashedPassword = await this.userRepository.passwordHashed(
    //   user.password,
    // );

    if (!bcrypt.compare(loginUserDto.password, user.password)) {
      // throw new BadRequestException('비밀번호가 일치하지 않습니다.', {
      //   cause: new Error(),
      //   description: 'password error',
      // });
      loginResult.loginError = '비밀번호가 일치하지 않습니다.';
      return res.status(203).json(loginResult);
    } else {
      loginResult.loginError = false;
    }

    const token = await this.authService.createToken(loginUserDto);

    // 쿠키를 헤더에 포함시키기
    // res.setHeader('Set-Cookie', 'Bearer ' + token);
    return res
      .cookie('token', /*'Bearer ' + */ token, {
        httpOnly: true,
        // maxAge: 24 * 60 * 60 * 1000, //1 day
        maxAge: 24 * 60 * 60 * 1000 * 7, //7 day
        path: '/',
      })
      .header('')
      .json(loginResult);

    //   // todo : accessToken 만들기
    //   res.cookie('token', token, {
    //     httponly: true,
    //   });
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
