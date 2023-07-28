import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IAcademicDepartment, IAcademicDepartmentFilters } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";
import { academicDepartmentSearchableFields } from "./academicDepartment.constant";

// create department 
const createDepartment = async(
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const result = (await AcademicDepartment.create(payload)).populate('academicFaculty');
  return result;
}

// get single semester 
const getSingleDepartment = async(
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id).populate('academicFaculty')
  return result;
}

// get all department
const getAllDepartments = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: academicDepartmentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $paginationOptions: 'i',
        },
      })),
    });
  }

  // Filters needs $and to fullfil all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: {[key: string]: SortOrder} = {};
  if(sortBy && sortOrder){
    sortConditions[sortBy]= sortOrder
  }
  // If there is no condition , put {} to give all data
  const whereConditions = andConditions.length > 0 ? { $and: andConditions} : {}

  const result = await AcademicDepartment.find(whereConditions).populate('academicFaculty').sort(sortConditions).skip(skip).limit(limit)

  const total = await AcademicDepartment.countDocuments(whereConditions)

  return{
    meta: {
      page,
      limit,
      total
    },
    data: result
  }
  
};

// update department
const updateDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  ).populate('academicFaculty');

  return result;
};

// delete department
const deleteDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};

export const AcademicDepartmentService = {
  createDepartment,
  getSingleDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment
}