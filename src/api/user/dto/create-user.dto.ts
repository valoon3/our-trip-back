import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiParam, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'email',
    default: 'admin@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'password',
    default: 'admin',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'name',
    default: '관리자',
  })
  name: string;
}
