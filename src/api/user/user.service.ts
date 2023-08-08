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
import { AuthService } from '../auth/auth.service';
import { Response } from 'express';
import { LoginResult, LoginUserDto } from '../../common/types/UserInfo.type';

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

    const { password, ...result } = await this.userRepository.createUser(
      createUserDto,
    );

    return result;
  }

  async signin(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const loginResult = await this.userRepository.validateUserInfo(
      loginUserDto,
    );

    if (loginResult.loginError) {
      return res.status(203).json(loginResult);
    }
    const token = await this.authService.createToken(loginUserDto);

    // 쿠키를 헤더에 포함시키기
    // res.setHeader('Set-Cookie', 'Bearer ' + token);
    return res
      .cookie('token', /*'Bearer ' + */ token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, //1 day
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
