import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyService } from './academicFaculty.service';
import pick from '../../../shared/pick';
import { academicFacultyFilterableField } from './academicFaculty.constant';
import { paginationFields } from '../../../constants/pagination';

// create faculty
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  const result = await AcademicFacultyService.createFaculty(
    academicFacultyData
  );

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty Created Successfully!',
    data: result,
  });
});

// get single faculty
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await AcademicFacultyService.getSingleFaculty(id);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully!',
    data: result,
  });
});

const getAllFaculties = catchAsync(async(req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableField);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await AcademicFacultyService.getAllFaculties(filters, paginationOptions);

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculties retrieved successfully!',
    meta: result.meta,
    data: result.data
  })
})


// update faculty
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const updatedData = req.body;
  const result = await AcademicFacultyService.updateFaculty(id, updatedData);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  });
});

// delete faculty
const deleteFaculty = catchAsync(
  async(req: Request, res: Response) => {
    const {id} = req.params;
    const result = await AcademicFacultyService.deleteByIdFromDB(id);
    
    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty deleted successfully!',
      data: result
    })
  }
)

export const AcademicFacultyController = {
  createFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
  getAllFaculties,
};
