import * as mongoose from 'mongoose';
import { userModel, userSchema } from './UserModel';

class UserRepository {
  private userModel: any;
  constructor() {
    this.userModel = userModel;
  }

  generateObjectId = () => {
    return String(mongoose.Types.ObjectId());
  }
  create = async (options: any): Promise<any> => {
    const createdData = await this.userModel.create({
      ...options,
      _id: this.generateObjectId(),
    });
    return createdData;
  }
}

export default UserRepository;
