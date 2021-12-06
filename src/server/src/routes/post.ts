import { Router } from "express";
import postController from "../controller/post.js";

const postRouter = Router();

postRouter.post('/page', postController.getPage);

export default postRouter;