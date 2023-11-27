import { CreateUserDto } from './create-user.dto';

export class LoginResultDto {
  loginError: boolean | string;
  errorMessage?: string;
  email?: string;
  name?: string;
}
