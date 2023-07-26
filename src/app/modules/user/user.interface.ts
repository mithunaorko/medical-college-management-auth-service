import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';

export type IUser = {
  id: string;
  password: string;
  role: string;
  student?: Types.ObjectId | IStudent;
  // faculty?: Types.ObjectId | IFaculty;
  // admin?: Types.ObjectId | IAdmin;
};

// when we use statics or methods we need to use this --Create a new Model type that knows about IUserMethods
export type UserModel = Model<IUser, Record<string, unknown>>;
