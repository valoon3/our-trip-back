import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../../api/user/user.module';

@Module({
  imports: [UserModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
