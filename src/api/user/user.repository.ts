import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../../db/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userEntity: Repository<User>,
  ) {}

  async checkExistEmail(email: string) {
    return await this.userEntity.exist({
      where: { email },
    });
  }

  async findOneByUserEmail(email: string) {
    const result = await this.userEntity.findOne({
      where: { email },
    });

    if (result) {
      return result;
    }

    throw new NotFoundException(
      '해당 이메일이 존재하지 않습니다. 이메일을 확인해 주세요.',
      {
        cause: new Error(),
        description: '해당 이메일이 존재하지 않습니다.',
      },
    );
  }

  async createUser(creatUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = await this.userEntity.create({
        ...creatUserDto,
        name: creatUserDto.name,
      });

      return await this.userEntity.save(newUser);
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  }

  async fineAll(): Promise<any> {
    const result = await this.userEntity.find();

    return result;
  }
}
