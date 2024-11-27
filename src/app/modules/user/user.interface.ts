import { Gender_User } from '../../../enums/user';



export type IUser = {
  id: number;
  name: string;
  image?: string;
  gender?: Gender_User;
  email: string;
  password: string;
};


export type IUpdateUser = {
  id?: number;
  name?: string;
  image?: string;
  gender?: Gender_User;
  email?: string;
  password?: string;
}