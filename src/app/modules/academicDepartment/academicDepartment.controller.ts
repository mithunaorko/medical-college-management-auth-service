import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentService } from './academicDepartment.service';
import pick from '../../../shared/pick';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';
import { paginationFields } from '../../../constants/pagination';

// Create department
const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartmentData } = req.body;
  const result = await AcademicDepartmentService.createDepartment(
    academicDepartmentData
  );

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Created Successfully!',
    data: result,
  });
});

// get single department
const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.getSingleDepartment(id);
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department fetched successfully!',
    data: result,
  });
});

// get all department 
const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await AcademicDepartmentService.getAllDepartments(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

// update department
const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.updateDepartment(id, req.body);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department updated successfully',
    data: result,
  });
});

// delete department
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.deleteDepartment(id);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department deleted successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createDepartment,
  getSingleDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
};
