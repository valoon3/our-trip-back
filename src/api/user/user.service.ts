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
import { AuthService } from '../../auth/auth/auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const userExist = await this.userRepository.findOneByUserEmail(
      createUserDto.email,
    );

    if (userExist) {
      // TODO : exception filter 사용하기
      throw new BadRequestException('email is exist!', {
        cause: new Error(),
        description: 'Some error description',
      });
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      Number(`${process.env.HASH_KEY}`),
    );

    createUserDto.password = hashedPassword;

    const { password, ...result } = await this.userRepository.create(
      createUserDto,
    );

    return result;
  }

  async signin(@Body() body: LoginUserDto) {
    console.log('login process!!!');
    console.log(body);

    return this.authService.singIn(body.email, body.password);
  }

  findAll() {
    return this.userRepository.fineAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
