import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "../user/user.interface";
import { SchoolService } from "./school.service";

const registerSchool = catchAsync(async (req: Request, res: Response) => {
  const user: IUser = await SchoolService.registerSchool(req.body);

  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'School registered successfully !',
    data: user,
  });
});

const getSchoolData = catchAsync(async (req: Request, res: Response) => {
  const schemaName = req.user?.schema;

  console.log(req.user);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendResponse<any>(res, {
    statusCode: 200,
    success: true,
    message: 'School data fetched successfully !',
    data: schemaName,
  });
})


export const SchoolController = {
  registerSchool,
  getSchoolData
}