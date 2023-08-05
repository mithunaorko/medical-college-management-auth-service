import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
// import { z } from "zod";

// create Student user
const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;
  const result = await UserService.createStudent(student, userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  });
});

// create Faculty user
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...userData } = req.body;
  const result = await UserService.createFaculty(faculty, userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty created successfully!',
    data: result,
  });
});

// create admin user
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { admin, ...userData } = req.body;
  const result = await UserService.createAdmin(admin, userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully!',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
};
