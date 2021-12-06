import { RequestHandler } from "express"
import { PostService } from "../model/post.js";

const postController: { [key: string]: RequestHandler } = {
    getPage: async (req, res) => {
        const { keyId } = req.body;
        const nextPosts = await PostService.getPaginatedPosts({ keyId })
        res.json(nextPosts);
    },
    getPost: async (req, res) => { }
}

export default postController;