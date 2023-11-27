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
  HttpCode,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { AuthService } from '../auth/auth.service';
import { LoginRequestDto } from '../auth/dto/login.request.dto';
import { LoggingInterceptor } from '../../common/interceptor/logging.interceptor';
import { HttpExceptionFilter } from '../../common/exceptions/http-exception.filter';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('api/user')
@UseFilters(HttpExceptionFilter)
@ApiTags('user controller api')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  // 회원가입
  @Post('/signup')
  @ApiOperation({ summary: '회원가입', description: '회원가입 API' })
  @ApiResponse({
    description: '유저를 생성한다.',
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    description: '이메일이 이미 존재하는 경우.',
    status: HttpStatus.CONFLICT,
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiParam({
    name: 'createUserDto',
    type: CreateUserDto,
  })
  signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.signup(createUserDto);
  }

  // 로그인
  @Post('/signin')
  // @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: '정상적인 로그인',
    status: HttpStatus.OK,
  })
  @ApiOperation({ summary: '로그인', description: '로그인 API' })
  @ApiParam({
    name: 'loginRequestDto',
    type: LoginRequestDto,
  })
  @ApiResponse({
    description: '정상적인 로그인.',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: '로그인 정보가 잘못된 경우.',
    status: HttpStatus.UNAUTHORIZED,
  })
  async signin(@Res() res, @Body() loginRequestDto: LoginRequestDto) {
    return await this.userService.signin(loginRequestDto, res);
  }

  @Post('/info')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: '정상적인 정보 조회',
    status: HttpStatus.OK,
  })
  async getInfo(@Req() req: any, @Res() res) {
    const userInfo = req.user;
    const result = { name: userInfo.name, email: userInfo.email };

    res.status(200).send(result);
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
