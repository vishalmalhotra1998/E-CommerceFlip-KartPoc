import { Router } from 'express';
import { userRouterHandler } from '../controller/User';
const mainRoute = Router();
mainRoute.use('/user', userRouterHandler);
export default mainRoute;
