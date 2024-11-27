import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { ILogInUser, IRefreshTokenResponse } from './auth.interface';

const prisma = new PrismaClient();


const loginUser = async (data: ILogInUser) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user || !(await bcrypt.compare(data.password, user.password))) {
    throw new Error('Invalid credentials');
  }
  //create access token & refresh token
  const { id, email: mail } = user
  const accessToken = jwtHelpers.createToken(
    { id, mail },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  )

  const refreshToken = jwtHelpers.createToken(
    { id, mail },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  )

  return {
    id,
    accessToken,
    refreshToken,
  }
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {

  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    )
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
  }

  const { email } = verifiedToken
  const isUserExist = await prisma.user.findUnique({
    where: { email: email },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      mail: isUserExist.email,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  )

  return {
    accessToken: newAccessToken,
  }
}
export const AuthService = {
  loginUser,
  refreshToken
};
