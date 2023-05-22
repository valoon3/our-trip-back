import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../../api/user/user.module';
import { UserRepository } from '../../api/user/user.repository';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
