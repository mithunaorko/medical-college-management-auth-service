/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IUser, UserModel } from './user.interface';
// import { IUser, IUserMethods, UserModel } from './user.interface';

// const UserSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
const UserSchema = new Schema<IUser>(
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
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// UserSchema.methods.isUserExist = async function(id: string): Promise<Partial<IUser> | null>{
//   return await User.findOne({id}, {id: 1, password: 1, needsPasswordChange: 1})
// }

// UserSchema.methods.isPasswordMatched = async function(givenPassword: string, savedPassword: string): Promise<boolean>{
//   return await bcrypt.compare(givenPassword, savedPassword)
// }

UserSchema.statics.isUserExist = async function (
  id: string
): Promise<Pick<IUser, 'id' | 'password' | 'needsPasswordChange' | 'role'> | null> {
  return await User.findOne(
    { id },
    { id: 1, password: 1, role: 1, needsPasswordChange: 1 }
  );
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};


// hash user password before save user
UserSchema.pre('save', async function (next) {
  const user = this;
  this.password = await bcrypt.hash(
    // this.password,
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

// Create a user model
export const User = model<IUser, UserModel>('User', UserSchema);
