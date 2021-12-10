import { RequestHandler } from "express"
import { PostService } from "../model/post.js";

const postController: { [key: string]: RequestHandler } = {
    getPage: async (req, res) => {
        const { keyId } = req.body;
        const nextPosts = await PostService.getPaginatedPosts({ keyId })
        res.json(nextPosts);
    },
    getPost: async (req, res) => { },
    likePost: async (req, res) => {
        const { postId } = req.body;
        // PostService.likePost(req.session.user.id, postId);
        await PostService.likePost(postId, '61aa0e3e8a1f72f9df6ccf66');
        res.end();
    }
}

export default postController;