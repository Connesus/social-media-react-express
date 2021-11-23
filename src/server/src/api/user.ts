import { Router } from 'express';
import UserController from '../controller/userController.js';

export const userAPI = Router();

userAPI.get('/api/user/:username', UserController.get);
userAPI.post('/api/user', UserController.create)