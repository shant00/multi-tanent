import { PrismaClient } from '@prisma/client';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { makeHashPassword } from '../../../shared/hashPassword';
import { IUser } from './user.interface';

const prisma = new PrismaClient();

const registerUser = async (data: IUser) => {
  const hashedPassword = await makeHashPassword(data.password);
  const findUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (findUser) {
    throw new Error('User already exists with this email');
  }

  const schemaName = data.name.replace(/[^a-zA-Z0-9_]/g, '_');

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: ENUM_USER_ROLE.ADMIN,
      schema: schemaName
    },
  });


  return user;
};
const updateUser = async (data: IUser) => {
  const user = await prisma.user.update({
    where: { id: data.id },
    data: {
      name: data.name,
      email: data.email,
      role: ENUM_USER_ROLE.ADMIN,
    }
  })
  return user;
}

export const UserService = {
  registerUser,
  updateUser
};