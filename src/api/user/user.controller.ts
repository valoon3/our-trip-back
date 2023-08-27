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
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { AuthService } from '../auth/auth.service';
import { LoginRequestDto } from '../auth/dto/login.request.dto';
import { CurrentUser } from '../../common/decorators/user.decorator';

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
  async signin(@Res() res, @Body() loginRequestDto: LoginRequestDto) {
    return await this.userService.signin(loginRequestDto, res);
  }

  @Post('/info')
  @UseGuards(JwtAuthGuard)
  async getInfo(@Req() req: any, @Res() res) {
    const userInfo = req.user;

    res.status(200).send(userInfo);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(@Res() res: Response) {
    // res.setHeader('Set-Cookie', `Authentication=; HttpOnly; Path=/; Max-Age=0`);

    res.cookie('token', '', {
      maxAge: 0,
    });

    return res.status(200).send('logout success');
  }

  // // jwt 테스트
  // @UseGuards(JwtAuthGuard)
  // @Post('/test')
  // async test(@CurrentUser() user) {
  //   return user;
  // }

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
