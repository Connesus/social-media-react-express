import { Router } from 'express'
import SessionController from '../controller/session.js'

const sessionRouter = Router()

sessionRouter.post("", SessionController.login);
sessionRouter.delete("", SessionController.logout);
sessionRouter.get("", SessionController.check);

export default sessionRouter;