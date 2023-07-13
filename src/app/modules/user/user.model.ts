import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

export const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// create user model
export const User = model<IUser, UserModel>('User', userSchema);
