import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../db/entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  UserInfo,
  CreateUserDto,
  LoginUserDto,
  LoginResult,
} from '../../common/types/UserInfo.type';
import * as bcrypt from 'bcrypt';
import * as process from 'process';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(User)
    private userEntity: Repository<User>,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async checkExistEmail(email: string): Promise<boolean> {
    return await this.userEntity.exist({
      where: { email },
    });
  }

  async findOneByUserEmail(email: string): Promise<User> {
    const user = await this.userEntity.findOne({
      where: { email },
    });

    if (user) {
      return user;
    }

    throw new NotFoundException(
      '해당 이메일이 존재하지 않습니다. 이메일을 확인해 주세요.',
      {
        cause: new Error(),
        description: '해당 이메일이 존재하지 않습니다.',
      },
    );
  }

  async findOneByUserId(userId: string) {
    const user = await this.userEntity.findOne({
      where: { id: Number(userId) },
    });

    if (user) return user;

    throw new NotFoundException('잘못된 로그인 정보입니다.', {
      cause: new Error(),
      description: '잘못된 로그인 정보입니다.',
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await this.passwordHashed(createUserDto.password);
      createUserDto.password = hashedPassword;

      const newUser = await this.userEntity.create({
        ...createUserDto,
      });

      return await this.userEntity.save(newUser);
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  }

  async validateUserInfo({
    email,
    password,
  }: LoginUserDto): Promise<LoginResult> {
    const loginResult: LoginResult = {
      loginError: false,
    };

    try {
      const user = await this.findOneByUserEmail(email);

      if (!user) {
        throw new Error('해당 이메일이 존재하지 않습니다.');
      }

      // const hashedPassword = await this.passwordHashed(password);

      if (!bcrypt.compare(password, user.password)) {
        throw new Error('비밀번호가 일치하지 않습니다.');
      }

      loginResult.userInfo = {
        name: user.name,
        password: user.password,
        email: user.email,
      };
    } catch (err) {
      loginResult.loginError = true;
      loginResult.errorMessage = err.message;
    }

    return loginResult;
  }

  async fineAll(): Promise<any> {
    const result = await this.userEntity.find();

    return result;
  }

  private async passwordHashed(password: string): Promise<string> {
    console.log(`${process.env.HASH_KEY}`);
    const hashedPassword = await bcrypt.hash(
      password,
      Number(`${process.env.HASH_KEY}`),
    );

    return hashedPassword;
  }
}
