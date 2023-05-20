import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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

    // try {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      Number(`${process.env.HASH_KEY}`),
    );
    // } catch (err) {
    //   console.error(err);
    // }

    createUserDto.password = hashedPassword;

    return this.userRepository.create(createUserDto);
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
