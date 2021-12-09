import { Router } from 'express'
import SessionController from '../controller/session.js'
import auth from '../utils/auth.js';

const sessionRouter = Router()

sessionRouter.post("", SessionController.login);
sessionRouter.delete("", auth.isAuthenticated, SessionController.logout);
sessionRouter.get("", SessionController.check);

export default sessionRouter;