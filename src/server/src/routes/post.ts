import { Router } from "express";
import postController from "../controller/post.js";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage })

const postRouter = Router();

postRouter.post('/page', postController.getPage);
postRouter.post('/like', postController.likePost);
postRouter.post('', upload.single('image'), postController.createPost);

export default postRouter;