import { Router } from 'express';
import UserController from '../controller/user.js';

const userRoutes = Router();

userRoutes.get('/:username', UserController.get);
userRoutes.post('/', UserController.create)

export default userRoutes;