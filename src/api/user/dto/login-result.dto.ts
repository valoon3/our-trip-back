import { CreateUserDto } from './create-user.dto';

export class LoginResultDto {
  loginError: boolean;
  errorMessage?: string;
  userInfo?: {
    email: string;
    name: string;
  };
}
