import { Model, Types } from "mongoose";
import { IAcademicDepartment } from "../academicDepartment/academicDepartment.interface";

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
}

export type IFaculty = {
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
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicFaculty: Types.ObjectId | IFaculty;
  designation: string;
}

export type FacultyModel = Model<IFaculty, Record<string, unknown>>

export type IFacultyFilters = {
  searchTerm?: string;
  id?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  gender?: 'male' | 'female';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  academicDepartment?: string;
  academicFaculty?: string;
  designation?: string;
};