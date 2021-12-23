import { ImageModel } from '../model/image.js';
import { RequestHandler, Request } from "express"
import { PostService } from "../model/post.js";

interface createPostRequest extends Request {
    file: Express.Multer.File
}

const postController: { [key: string]: RequestHandler } = {
    getPage: async (req, res) => {
        const { keyId } = req.body;
        const nextPosts = await PostService.getPaginatedPosts({ keyId })
        res.json(nextPosts);
    },
    getPost: async (req, res) => {
        res.json(await PostService.findPostById(req.params.id));
    },
    likePost: async (req, res) => {
        const { postId } = req.body;
        // PostService.likePost(req.session.user.id, postId);
        await PostService.likePost(postId, '61aa0e3e8a1f72f9df6ccf66');
        res.end();
    },
    // @ts-ignore
    createPost: async (req: createPostRequest, res) => {
        let imageId;
        if (req.file) {
            const newImage = new ImageModel({ data: req.file.buffer, type: req.file.mimetype, name: req.file.originalname });
            await newImage.save();
            imageId = newImage.id;
        }
        console.log(imageId ? `imageId: ${imageId}` : 'No image');
        const postData = JSON.parse(JSON.parse(req.body.postData));
        await PostService.createPost({ ...postData, imageId })
        res.end()
    }
}

export default postController;
