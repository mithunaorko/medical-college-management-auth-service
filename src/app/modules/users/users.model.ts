import { Model, Schema, model } from "mongoose";
import { IUser } from "./users.interface";

// when we use statics or methods we need to use this --Create a new Model type that knows about IUserMethods
type UserModel = Model<IUser, object>;

export const userSchema = new Schema<IUser>({
  id: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// create user model
export const User = model<IUser, UserModel>('User', userSchema)