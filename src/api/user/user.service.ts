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

    const token = await this.authService.createToken(loginUserDto);

    const user = await this.userRepository.findOneByUserEmail(
      loginUserDto.email,
    );

    loginResult.email = user.email;
    loginResult.name = user.name;
    loginResult.loginError = false;

    return res // acessToken 첨부
      .cookie('token', token, {
        httpOnly: true,
        // maxAge: 24 * 60 * 60 * 1000, //1 day
        maxAge: 24 * 60 * 60 * 1000 * 7, //7 day
        path: '/',
      })
      .header('')
      .json(loginResult);
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
