/*
  -> Only Database logic here / Business logic
*/

import config from '../../../config/index'
import ApiError from '../../../errors/ApiError'
// import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import { IUser } from './user.interface'
import { User } from './user.model'
// import { generateStudentId } from './user.utils'
// import { generateFacultyId } from './user.utils'

// create user
const createStudent = async (student: IStudent ,user: IUser): Promise<IUser | null> => {

  // default password
  if (!user.password) {
    user.password = config.default_student_pass as string
  }

  // user.role = 'student';

  // const academicsemester = await AcademicSemester.findById(student.academicSemester);

  // const id = await generateStudentId(academicsemester)

  const createdUser = await User.create(user)

  if (!createStudent) {
    throw new ApiError(400, 'Failed to create user!')
  }
  return createdUser
}

// export default {
//   createUser,
// }

export const userService = {
  createStudent
};