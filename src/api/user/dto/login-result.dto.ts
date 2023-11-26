import { CreateUserDto } from './create-user.dto';

export class LoginResultDto {
  loginError: boolean | string;
  errorMessage?: string;
  userInfo?: {
    email: string;
    name: string;
  };
}
