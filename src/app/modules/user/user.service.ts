/*
  -> Only Database logic here / Business logic
*/

import config from '../../../config/index'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'

// create user
const createUser = async (user: IUser): Promise<IUser | null> => {

  // test purpose
  const academicSemester = {
    code: '01',
    year: '2025'
  }
  // auto generated incremental id
  const id = await generateStudentId(academicSemester)

  user.id = id

  // default password
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = await User.create(user)

  if (!createUser) {
    throw new ApiError(400, 'Failed to create user!')
  }
  return createdUser
}

// export default {
//   createUser,
// }

export const userService = {
  createUser
};