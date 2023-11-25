import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
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
}
