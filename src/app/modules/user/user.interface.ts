import { Role } from "../../../enums/user";


export type IUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  schema?: string;
}

export type IUpdateUser = {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  schema?: string;
}