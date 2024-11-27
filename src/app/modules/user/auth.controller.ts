import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const user: IUser = await UserService.registerUser(req.body);

  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'User registered successfully !',
    data: user,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const user: IUser = await UserService.updateUser(req.body);


  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'User updated successfully !',
    data: user,
  });

})





export const AuthController = {
  registerUser,
  updateUser
};
