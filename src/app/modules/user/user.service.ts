/*
  -> Only Database logic here / Business logic
*/

import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
// import { generateFacultyId } from './user.utils'

// create user
const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  user.role = 'student';

  const academicsemester = await AcademicSemester.findById(
    student.academicSemester
  ).lean();

  // create student with user
  // generate student
  let newUserAllData = null;

  const session = await mongoose.startSession();
  try {
    // first start the session transaction
    session.startTransaction();
    const id = await generateStudentId(academicsemester);
    // custom id same as user id and same as student id
    user.id = id;
    student.id = id;

    // (array)
    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student!');
    }

    // create user
    // set student -> _id into user.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User!');
    }

    newUserAllData = newUser[0]

    // commit the transaction
    await session.commitTransaction();

    // end the session
    await session.endSession();
  } catch (error) {
    // if got any error abort the transaction
    await session.abortTransaction();
    // end the session
    await session.endSession();
    // throw error
    throw error;
  }

  if(newUserAllData){
    newUserAllData = await User.findOne({id: newUserAllData.id}).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester'
        },
        {
          path: 'academicDepartment'
        },
        {
          path: 'academicFaculty'
        },
        
      ]
    })
    return newUserAllData
  }
};

export const userService = {
  createStudent,
};
