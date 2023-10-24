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
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { AuthService } from '../auth/auth.service';
import { LoginRequestDto } from '../auth/dto/login.request.dto';
import { LoggingInterceptor } from '../../common/interceptor/logging.interceptor';
import { HttpExceptionFilter } from '../../common/exceptions/http-exception.filter';

@Controller('api/user')
@UseFilters(HttpExceptionFilter)
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

  @Get('/testinterceptor')
  @UseInterceptors(LoggingInterceptor)
  testInterceptor() {
    console.log('test interceptor 시작');
    return;
  }
}
