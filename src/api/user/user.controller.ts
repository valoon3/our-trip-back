import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  Res,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { AuthService } from '../auth/auth.service';
import { LoginRequestDto } from '../auth/dto/login.request.dto';

@Controller('api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  // 회원가입
  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.signup(createUserDto);
  }

  // 로그인
  @Post('/signin')
  // @UseGuards(JwtAuthGuard)
  async signin(@Body() loginRequestDto: LoginRequestDto) {
    const result = await this.authService.singIn(loginRequestDto);
    // return await this.authService.singIn(loginRequestDto);

    // todo : 중복 아이디가 있을 경우 비밀번호가 일치하지 않을경우 에러처리하기
    // if (Object.keys(result).length > 0) {
    //   res.status(HttpStatus.UNAUTHORIZED).json(result);
    // }

    return result;
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
