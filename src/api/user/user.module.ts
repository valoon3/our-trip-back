import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth/auth.module';
import { AuthService } from '../../auth/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
