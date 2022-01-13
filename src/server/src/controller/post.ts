import { Image } from '../model/image.js';
import { RequestHandler, Request } from "express"
import {PostService} from "../service/post.js";
// import {getPostByIdResponseT} from "@shared/types";
import mongoose from "mongoose";
import {UserService} from "../service/user.js";
import {IPost, IPostDoc, Post} from "../model/post.js";
import {parseIdStr} from "../utils/helpers.js";
import {Like} from "../model/like.js";
import {User} from "../model/user.js";

interface createPostRequest extends Request {
    file: Express.Multer.File
}

const postController: { [key: string]: RequestHandler } = {
    paginateFeed: async (req, res) => {
        const anchor = parseIdStr(req.body.anchor);
        const prev = Boolean(req.body.prev)
        const userId = parseIdStr(req?.session?.userData?._id);

        const feedPosts = await PostService.paginatePosts({}, {_id: -1}, anchor, prev)

        if (userId) {
            await Promise.all(feedPosts.map((post: IPostDoc) => post.populateUserActions(userId)))
        }
        return res.json(feedPosts);
    },

    paginateReplies: async (req, res) => {
        const postId = parseIdStr(req.body.postId);
        const anchor = parseIdStr(req.body.anchor);
        const prev = Boolean(req.body.prev)
        const userId = parseIdStr(req?.session?.userData?._id);

        if (postId) {
            const replies = await PostService.paginatePosts({replyTo: postId}, {_id: -1}, anchor, prev)

            if (userId) {
                await Promise.all(replies.map((post: IPostDoc) => post.populateUserActions(userId)))
            }
            return res.json(replies)
        }
        throw new Error('Post id undefined')
    },
    paginateProfile: async (req, res) => {
        const username = String(req.body.username);
        let profileId = parseIdStr(req.body.userId);
        const anchor = parseIdStr(req.body.anchor);
        const prev = Boolean(req.body.prev)
        const userId = parseIdStr(req?.session?.userData?._id);

        if (!profileId && !username) throw new Error('Profile: Invalid request arguments');
        if (!profileId && username) {
            const user = await User.findOne({username})
            if (!user) throw new Error('Profile: Invalid request arguments');
            profileId = user._id;
        }

        const profilePosts = await PostService.paginatePosts({user: profileId}, {_id: -1}, anchor, prev)

        if (userId) {
            await Promise.all(profilePosts.map((post: IPostDoc) => post.populateUserActions(userId)))
        }
        return res.json(profilePosts)
    },
    paginateSearch: async (req, res) => {
        const text = String(req.body.text);
        const anchor = parseIdStr(req.body.anchor);
        const prev = Boolean(req.body.prev)
        const userId = parseIdStr(req?.session?.userData?._id);

        if (text) {
            const foundPosts = await PostService.paginatePosts(
              { $text : { $search : text }},
              {_id: -1},
              anchor,
              prev
            )

            if (userId) {
                await Promise.all(foundPosts.map((post: IPostDoc) => post.populateUserActions(userId)))
            }
            return res.json(foundPosts)
        }
        throw new Error('Search: Post text not found.')
    },
    getPost: async (req, res) => {
        const id = parseIdStr(req.params.id);
        const userId = parseIdStr(req?.session?.userData?._id);

        if (id) {
            const post = await Post.findById(id).populateCount();
            if (!post) throw new Error('Post not found');
            post.populateUserActions(userId);
            const posts = [post];

            const user = await User.findById(post.user);
            if (!user) throw new Error('Post author not found');
            const users = [user]

            return res.json({posts, users})
        }
        throw new Error('Invalid post id');
    },
    likePost: async (req, res) => {
        const id = parseIdStr(req.body.id);
        const userId = parseIdStr(req?.session?.userData?._id);

        if (id && userId) {
            const postExists = await Post.exists({_id: id});

            if (postExists) {
                const likeExists = await Like.exists({postId: id, userId});

                if (likeExists) {
                    await Like.deleteOne({postId: id, userId})
                } else {
                    await Like.create({postId: id, userId})
                }

                const updatedPost = await Post.findById(id).populateCount();
                await updatedPost.populateUserActions(userId);
                return res.json({posts: [updatedPost]})
            }
            throw new Error('Post doesn\'t exist');
        }
        throw new Error('Post like invalid arguments');
    },
    createPost: async (req, res) => {
        let imageId;
        const replyTo = parseIdStr(req.body.replyTo);
        const text = String(req.body.text);
        const user = parseIdStr(req?.session?.userData?._id);

        if (user && (text || req.file)) {
            if (req.file) {
                const newImage = new Image({
                    data: req.file.buffer,
                    mime: req.file.mimetype,
                    name: req.file.originalname
                });
                await newImage.save();
                imageId = newImage._id;
            }

            const post = await Post.create({user, text, replyTo, imageId})
            return res.json({posts: [post]})
        }
        throw new Error('Error: Post data issue')
    },
    getUserPosts: async (req, res) => {
        const username = String(req.body.username);
        const userId = parseIdStr(req?.session?.userData?._id);

        const user = await User.findOne({username});
        if (!user) throw new Error('User not found');

        const posts = await Post.find({user: user._id}).populateCount();
        if (!posts) throw new Error('Error when searching for user posts');

        if (userId) {
            await Promise.all(posts.map((post: IPostDoc) => post.populateUserActions(userId)))
        }

        res.json({users: [user], posts})
    },

    deletePostById: async (req, res) => {
        const postId = parseIdStr(req.params.id);
        const userId = parseIdStr(req.session.userData?._id);

        console.log('postId', postId);
        console.log('userId', userId)

        if (userId && postId) {
            const post = await Post.findById(postId);

            if (post && post?.user?.toString() == userId.toString()) {
                if (post.imageId) {
                    await Image.deleteOne({_id: post.imageId});
                }
                await Like.deleteMany({postId});
                await Post.deleteMany({replyTo: postId});
                await Post.deleteMany({repostOf: postId});
                await post.remove()

                return res.json(post);
            }
        }
        throw new Error('Delete Post: Invalid request data');
    },

    makeRepost: async (req, res) => {
        const postId = parseIdStr(req.params.id);
        const userId = parseIdStr(req.session.userData?._id)

        if (postId && userId) {
            const repostPost = await Post.findById(postId);
            if (!repostPost) throw new Error('Couldn\'t find post to repost');

            const repostExists = await Post.exists({repostOf: postId, user: userId});
            if (repostExists) {
                await Post.deleteOne({repostOf: postId, user: userId});
            } else {
                await Post.create({user: userId, repostOf: postId});
            }

            const updatedPost = await Post.findById(postId).populateCount();
            await updatedPost.populateUserActions(userId);

            return res.json({posts: [updatedPost]})
        }
        throw new Error('Repost: Invalid request arguments')
    }
}

export default postController;
