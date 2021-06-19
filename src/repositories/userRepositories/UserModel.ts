import * as mongoose from 'mongoose';
import { IUserModel } from './interface';
import UserSchema from './UserSchema';
export const userSchema = new UserSchema({
  collection: 'userDetails'
});

export const userModel: mongoose.Model<IUserModel> = mongoose.model<IUserModel>(
  'userDetails', userSchema, 'User', true);

