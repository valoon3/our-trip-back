export type UserInfo = {
  email: string;
  password: string;
};

export type LoginUserDto = UserInfo;

export interface CreateUserDto extends UserInfo {
  name: string;
}

export type LoginResult = {
  loginError: boolean;
  errorMessage?: string;
  userInfo?: CreateUserDto;
};
