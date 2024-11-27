import { Role } from '../../../enums/user';

export type ILoginUserResponse = {
  id: number;
  role: Role;
  accessToken: string;
  refreshToken: string;
};

export type ILogInUser = {
  email: string;
  password: string;
}


export type IRefreshTokenResponse = {
  accessToken: string
}
