import * as mongoose from 'mongoose';
export default class UserSchema extends mongoose.Schema {
  constructor(data) {
    const userSchema = {
      id: String,
      name: String,
      email: String,
      password: String,
      address: String,
      dob: Date,
      role: String,
      mob: Number,
    };
    super(userSchema, data);
  }
}
