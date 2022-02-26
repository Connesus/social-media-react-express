import { Router } from "express";
import postController from "../controller/post.js";
import multer from "multer";
import { use } from "../utils/helpers.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const postRouter = Router();

postRouter.get("/:id", use(postController.getPost));
postRouter.post("/page", use(postController.getPage));
postRouter.post("/like", use(postController.likePost));
postRouter.post(
  "/create",
  upload.single("file"),
  use(postController.createPost)
);
postRouter.post("/user", use(postController.getUserPosts));
postRouter.post("/repost", use(postController.createPost));
postRouter.post("/replies", use(postController.getPostReplies));
postRouter.delete("/delete/:id", use(postController.deletePostById));
postRouter.post("/repost/:id", use(postController.makeRepost));
postRouter.post("/paginate/feed", use(postController.paginateFeed));
postRouter.post("/paginate/replies", use(postController.paginateReplies));
postRouter.post("/paginate/profile", use(postController.paginateProfile));
postRouter.post("/paginate/search", use(postController.paginateSearch));

export default postRouter;
