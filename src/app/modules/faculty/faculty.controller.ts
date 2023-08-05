import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { facultyFilterableFields } from './faculty.constant';
import { IFaculty } from './faculty.interface';
import { FacultyService } from './faculty.service';

// get single faculty
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.getSingleFaculty(id);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully!',
    data: result,
  });
});

// get all faculty
const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, facultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await FacultyService.getAllFaculties(
    filter,
    paginationOptions
  );

  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Faculties retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

// update faculty
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await FacultyService.updateFaculty(id, updatedData);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty update successfully!',
    data: result,
  });
});

// Delete faculty
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.deleteFaculty(id);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty delete successfully!',
    data: result,
  });
});

export const FacultyController = {
  getSingleFaculty,
  getAllFaculties,
  updateFaculty,
  deleteFaculty,
};
