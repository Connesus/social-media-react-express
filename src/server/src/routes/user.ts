import { Router } from 'express';
import UserController from '../controller/user.js';
import auth from '../utils/auth.js';
import {use} from "../utils/helpers.js";

const userRoutes = Router();

userRoutes.get('/:username', use(UserController.get));
userRoutes.post('/register', use(UserController.register));
userRoutes.post('/login', use(UserController.login));
userRoutes.post('/logout', use(UserController.logout));
userRoutes.post('/check', use(UserController.check));


export default userRoutes;
