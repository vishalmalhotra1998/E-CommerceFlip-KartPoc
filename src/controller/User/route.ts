import { Router } from 'express';
import UserController from './UserController';
import { validation } from './validations';
import { validateInputs } from '../../libs/validation';
const routeHandler = Router();
routeHandler.post('/sign-up', validateInputs(validation.create), UserController.signUp);
export default routeHandler;
