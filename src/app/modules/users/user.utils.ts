// auto generate user id

import { User } from './user.model'

// get last created user id from database using findOne query
export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 1 })
    .sort({ createdAt: -1 })
    .lean()
  return lastUser?.id
}

export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0')
  // incremented by 1
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  return incrementedId
}
