import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { adminFilterableFields } from './admin.constant';
import { IAdmin } from './admin.interface';
import { AdminService } from './admin.service';

// get single admin
const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AdminService.getSingleAdmin(id);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully!',
    data: result,
  });
});

// get all admin
const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AdminService.getAllAdmins(filters, paginationOptions);

  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

// update admin
const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await AdminService.updateAdmin(id, updatedData);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully!',
    data: result,
  });
});

// delete admin
const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AdminService.deleteAdmin(id);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully!',
    data: result,
  });
});

export const AdminController = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
