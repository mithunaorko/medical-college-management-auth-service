import { Model, Types } from "mongoose";
import { IAcademicFaculty } from "../academicFaculty/academicFaculty.interface";

export type IAcademicDepartment = {
  title: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty
};

export type IAcademicDepartmentFilters = {
  searchTerm?: string;
  academicFaculty?: Types.ObjectId;
};

export type AcademicDepartmentModel = Model<IAcademicDepartment, Record<string, unknown>>