import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  // we are mapping season (Autumn, Summer, Fall) with code (01, 02, 03)
  // if is not match throw a error message
  // we know when we access object property we can use dot notation or [] notation
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code!');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};



// for pagination and get semester doc
const getAllSemesters = async(paginationOptions: IPaginationOptions): Promise<IGenericResponse<IAcademicSemester[]>> => {
  // const {page=1, limit=10} = paginationOptions;
  // const skip = (page - 1)*limit;
  const {page, limit, skip, sortBy, sortOrder} = paginationHelpers.calculatePagination(paginationOptions);

  const sortCondition: {[sortBy: string]: SortOrder} = {};

  if(sortBy && sortOrder){
    sortCondition[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find().sort(sortCondition).skip(skip).limit(limit);

  const total = await AcademicSemester.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result
  };
}

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
};
