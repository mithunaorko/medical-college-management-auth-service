/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { User } from '../user/user.model';
import { adminSearchableFields } from './admin.constant';
import { IAdmin, IAdminFilters } from './admin.interface';
import { Admin } from './admin.model';

// get single admin
const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findOne({ id }).populate('ManagementDepartment');
  return result;
};

// get all admins
const getAllAdmins = async (
  filters: IAdminFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAdmin[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: adminSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Admin.find(whereCondition)
    .populate('managementDepartment')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Admin.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// update admin
const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Admin not found!');
  }

  const { name, ...adminData } = payload;

  const updatedAdminData: Partial<IAdmin> = { ...adminData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IAdmin>;
      (updatedAdminData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Admin.findOneAndUpdate({ id }, updatedAdminData, {
    new: true,
  });
  return result;
};
// delete admin
const deleteAdmin = async (id: string): Promise<IAdmin> => {
  const isExist = await Admin.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Admin not found!');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // delete admin delete first
    const admin = await Admin.findOneAndDelete({ id }, { session });
    if (!admin) {
      throw new ApiError(404, 'Failed to delete admin!');
    }

    // delete admin
    await User.deleteOne({ id });

    await session.commitTransaction();
    await session.endSession();
    return admin;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  }
};

export const AdminService = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
