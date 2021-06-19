import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../../repositories';

class UserController {
  private userRepository: UserRepository = new UserRepository();
  static instance;
  static getInstance = () => {
    if (!UserController.instance) {
      return UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ...rest } = req.body;
      const createdUser = await this.userRepository.create(rest);
      res.send({
        data: createdUser,
      });
    } catch (error) {
      next(error);
    }
  }

}

export default UserController.getInstance();
