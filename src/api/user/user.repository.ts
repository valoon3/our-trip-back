import { Injectable } from '@nestjs/common';
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

  async findOneByUserEmail(email: string) {
    const userExist = await this.userEntity.findOne({
      where: { email },
    });

    return userExist;
  }

  async create(creatUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.userEntity.create({
      ...creatUserDto,
      name: creatUserDto.username,
    });
    return await this.userEntity.save(newUser);
  }

  async fineAll(): Promise<any> {
    const result = await this.userEntity.find();

    return result;
  }
}
