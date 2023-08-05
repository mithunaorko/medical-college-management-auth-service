import { Schema, Types, model } from 'mongoose';
import { FacultyModel, IFaculty } from './faculty.interface';

const facultySchema = new Schema<IFaculty, FacultyModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
          required: false,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    profileImage: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Others'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: true,
      unique: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    academicDepartment: {
      type: Types.ObjectId,
      ref: 'academicDepartment',
      required: true,
    },
    academicFaculty: {
      type: Types.ObjectId,
      ref: 'academicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Faculty = model<IFaculty, FacultyModel>('Faculty', facultySchema);