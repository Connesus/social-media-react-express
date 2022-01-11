import { Router } from "express";
import postController from "../controller/post.js";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage })

const postRouter = Router();

postRouter.get('/:id', postController.getPost);
postRouter.post('/page', postController.getPage);
postRouter.post('/like', postController.likePost);
postRouter.post('/create', upload.single('file'), postController.createPost);
postRouter.post('/user', postController.getUserPosts);
postRouter.post('/repost', postController.createPost);
postRouter.post('/replies', postController.getPostReplies)
postRouter.delete('/delete/:id', postController.deletePostById)
postRouter.post('/repost/:id', postController.makeRepost)


export default postRouter;
