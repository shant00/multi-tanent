import { PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { makeHashPassword } from '../../../shared/hashPassword';
import { IUser } from './user.interface';

const prisma = new PrismaClient();

const registerUser = async (data: IUser) => {
  const hashedPassword = await makeHashPassword(data.password);
  const findUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (findUser) {
    throw new ApiError(httpStatus.FORBIDDEN, 'User already exists with this email');
  }
  const user = await prisma.user.create({
    data: {
      name: data.name,
      image: data.image,
      gender: data.gender,
      email: data.email,
      password: hashedPassword,
      role: ENUM_USER_ROLE.TRAINEE,
    },
  });

  return user;
};

const updateUser = async (data: IUser) => {
  const user = await prisma.user.update({
    where: { id: data.id },
    data: {
      name: data.name,
      image: data.image,
      gender: data.gender,
      email: data.email,
      // password: hashedPassword,
      role: ENUM_USER_ROLE.TRAINEE,
    }
  })
  return user;
}



export const UserService = {
  registerUser,
  updateUser
};
