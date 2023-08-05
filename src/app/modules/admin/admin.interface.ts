import { Model, Types } from 'mongoose';
import { IManagementDepartment } from '../managementDepartment/managementDepartment.interface';

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type IAdmin = {
  id: string;
  name: UserName;
  profileImage: string;
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender?: 'Male' | 'Female' | 'Others';
  presentAddress?: string;
  permanentAddress?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  managementDepartment: Types.ObjectId | IManagementDepartment;
  designation: string;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;

export type IAdminFilters = {
  searchTerm?: string;
  id?: string;
  gender?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  managementDepartment?: string;
  designation?: string;
};
