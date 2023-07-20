// control request and response
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { userService } from './user.service';
// import { z } from "zod";

const createStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { student,...userData } = req.body;
    const result = await userService.createStudent(student,userData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully!',
      data: result,
    })
    next();
  }
);

export const UserController = {
  createStudent,
};
