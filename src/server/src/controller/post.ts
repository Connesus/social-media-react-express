import { ImageModel } from '../model/image.js';
import { RequestHandler, Request } from "express"
import {PostService} from "../service/post.js";
// import {getPostByIdResponseT} from "@shared/types";
import mongoose from "mongoose";
import {UserService} from "../service/user.js";
import {Post} from "../model/post.js";

interface createPostRequest extends Request {
    file: Express.Multer.File
}

const postController: { [key: string]: RequestHandler } = {
    getPage: async (req, res) => {
        // const { id } = req.body;
        const id = new mongoose.Types.ObjectId(req.body.id);

        console.log('id', id)
        console.log('body', req.body);
        const userId = new mongoose.Types.ObjectId(req.session?.userData?.id);
        const posts = await PostService.getPaginatedPosts({ id, userId }) || [];

        const userIds = posts.map(post => new mongoose.Types.ObjectId(post.author));
        const users = await UserService.getUsersById(userIds) || [];
        return res.json({posts, users})
    },
    getPost: async (req, res) => {
        const ids = [ new mongoose.Types.ObjectId(req.params.id) ]
        const posts = await PostService.findPostsById(
          ids,
          new mongoose.Types.ObjectId(req.session?.userData?.id),
          Boolean(req.query.postsOnly)
        ) || [];

        const userIds = posts.map(post => new mongoose.Types.ObjectId(post.author));
        const users = await UserService.getUsersById(userIds) || []
        return res.json({posts, users})
        // const data: getPostByIdResponseT = await PostService.findPostById([req.params.id], req.session?.userData?.id)
        // res.json(data);
    },
    likePost: async (req, res) => {
        const { id } = req.body;
        const userId = req.session?.userData?.id;
        await PostService.likePost(id, userId);
        const updatedPost = await PostService.findPostsById(
          [new mongoose.Types.ObjectId(id)], new mongoose.Types.ObjectId(userId))
        return res.json({posts: updatedPost})
    },
    // @ts-ignore
    createPost: async (req: createPostRequest, res) => {
        let imageId;
        const replyTo = req.body.replyTo && new mongoose.Types.ObjectId(req.body.replyTo);
        const text = req.body.text;
        const userId = req?.session?.userData?.id && new mongoose.Types.ObjectId(req?.session?.userData?.id);

        console.log('replyTo', replyTo);

        if (userId && req?.session?.userData?.id && (text || req.file)) {

            if (req.file) {
            console.log('file')
            const newImage = new ImageModel({
                data: req.file.buffer,
                type: req.file.mimetype,
                name: req.file.originalname
            });
            await newImage.save();
            imageId = newImage.id;
        }
        console.log(imageId ? `file: ${imageId}` : 'No image');
        console.log(req.body.text)
        const post = await PostService.createPost({
            text,
            imageId,
            author: new mongoose.Types.ObjectId(userId),
            replyTo
        })
        if (replyTo) {
            const replyToPost = await PostService.replyToPostById(replyTo, post._id);
            return res.json({posts: [post, replyToPost]})
        }

        return res.json({posts: [post]})
        }
        return res.json({error: 'Wrong post data'})
    },
    getUserPosts: async (req, res) => {
        const {username} = req.body;
        const result = await PostService.getUserPostsByUsername(username, req?.session?.userData?.id);
        res.json(result);
    },

    getPostReplies: async (req, res) => {
        const postId = req.body.id;
        const userId = req.session.userData?.id
        console.log('zull')
        if (userId && postId) {
            const postObjId = new mongoose.Types.ObjectId(postId)
            const userObjId = new mongoose.Types.ObjectId(userId)
            const post = await Post.findById(postObjId, {likes: 0, reposts: 0})
            console.log(post)
            if (post && post.replies) {
                console.log(post.replies)
                const results = await PostService.findPostsById([ ...post.replies], userObjId);
                return res.json({posts: [...results, post]});
            }
            return res.end('No replies')
        }
        return res.json({error: 'Invalid ids'})
    },

    deletePostById: async (req, res) => {
        const postId = req.params.id;
        const userId = req.session.userData?.id

        if (userId && postId) {
            const postObjId = new mongoose.Types.ObjectId(postId);
            const userObjId = new mongoose.Types.ObjectId(userId);
            const post = await Post.findById(postObjId);

            if (post && post.author.equals(userObjId)) {
                await Post.deleteOne(({_id: postObjId}));
                return res.status(200).end()
            }
        }
        return res.status(500).json({error: 'DELETE: Invalid request'})
    },

    makeRepost: async (req, res) => {
        const postId = req.params.id;
        const userId = req.session.userData?.id

        if (postId && userId) {
            const postObjId = new mongoose.Types.ObjectId(postId);
            const userObjId = new mongoose.Types.ObjectId(userId);

            const newPostId = await PostService.repostPost(postObjId, userObjId);
            const postIds = newPostId ? [newPostId, postObjId] : [postObjId]
            console.log('newPostId', newPostId)
            const posts = await PostService.findPostsById(postIds, userObjId)
            return res.json({posts})
        }
        return res.status(500).json('Error while trying to repost')
    }

    // repost: async (req, res) => {
    //     const {id} = req.body;
    //     const userId = req.session.userData?.id;
    //
    //     if (id && userId) {
    //         const repostPost = await Post.findById(id);
    //         const post = await Post.create({author: userId, repostOf: id})
    //         // await Post.findOneAndUpdate({_id: id}, {})
    //         await Post.findByIdAndUpdate(id, { '$pull': { 'likes': userObjId } });
    //
    //
    //         return res.json({error: 'Invalid arguments'})
    //     }
    // }
}

export default postController;
