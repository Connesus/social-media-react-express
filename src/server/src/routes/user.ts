import { Router } from 'express';
import UserController from '../controller/user.js';
import auth from '../utils/auth.js';

const userRoutes = Router();

userRoutes.get('/:username', auth.isAuthenticated, UserController.get);
userRoutes.post('/create', UserController.create)

export default userRoutes;
