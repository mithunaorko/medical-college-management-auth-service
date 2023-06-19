import { Model } from 'mongoose';

export type IAcademicSemesterTitles = "Autumn" | "Summer" | "Fall";

export type IAcademicSemesterCodes = "01" | "02" | "03";

export type IAcademicSemesterMonths = "January" | "February" | "March" | "April" | "May" | "June"
| "July" | "August" | "September" | "October" | "November" | "December";


// AcademicSemester interface 
export type IAcademicSemester = {
  title: IAcademicSemesterTitles;
  year: number;
  code: IAcademicSemesterCodes,
  startMonth: IAcademicSemesterMonths;
  endMonth: IAcademicSemesterMonths;
};

// create a new model type that know about IAcademicSemester
export type AcademicSemesterModel = Model<IAcademicSemester>;
