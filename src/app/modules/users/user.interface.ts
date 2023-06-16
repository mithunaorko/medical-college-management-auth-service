import { Model } from "mongoose";

export type IUser = {
  id: string;
  password: string;
  role: string;
};

// when we use statics or methods we need to use this --Create a new Model type that knows about IUserMethods
export type UserModel = Model<IUser, Record<string, unknown>>;