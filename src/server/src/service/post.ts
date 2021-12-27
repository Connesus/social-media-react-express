import { LikeModel } from '../model/like.js';
import mongoose, { Document, MongooseQueryOptions, FilterQuery, ObjectId, DocumentDefinition } from "mongoose";
import { IUser } from "../model/user.js";
import {IPost, Post} from "../model/post.js";
import {LikeService} from "./like.js";

const { model, Schema } = mongoose;

type getPaginatedPostsOptionsT = {
    // query: FilterQuery<IPost>,
    // prevPosts?: IPost[] | Falsy,
    keyId: IPost['id'] | undefined
    limit?: number
};

export class PostService {
    async findPost(
        query: FilterQuery<IPost>,
        options: MongooseQueryOptions = { lean: true }
    ) {

    }

    static async findPostById(id: IPost['_id']) {
        return Post.findById(id);
    }

    static async createPost({ type, createdAt, postedBy, text, imageId, repostOf, replyTo }: {
        type: IPost['type'],
        postedBy: IPost['postedBy'],
        createdAt: IPost['createdAt'],
        text?: IPost['text'],
        imageId?: IPost['imageId'],
        repostOf?: IPost['repostOf'],
        replyTo?: IPost['replyTo']
    }) {
        const newPost = new Post({ type, postedBy, text, imageId, createdAt })
        if (type === 'repost') {
            newPost.repostOf = repostOf;
        } else if (type === 'reply') {
            newPost.replyTo = replyTo;
        }
        await newPost.save()
    }

    static async deletePost(postId: ObjectId, userId: ObjectId) {
        const post = await Post.findById(postId);
        if (post == null) return { status: 404, message: 'Couldn\'t delete post: post not found' }
        if (post.postedBy == userId) {
            await post.remove();
            return { status: 200, message: 'Post deleted.' }
        }
        return { status: 403, message: 'You can delete only your posts.' }

    }

    static async likePost(postId: IPost['id'], userId: IUser['_id']) {
        const prevLike = await LikeService.getByUserAndPostIds(userId, postId)

        if (prevLike == null) {
            console.log('add like');
            const newLike = new LikeModel({ postId, userId })
            await newLike.save();
            await Post.findByIdAndUpdate(postId, { "$push": { 'likes': newLike.id } })
        } else {
            console.log('remove like');
            await Post.findByIdAndUpdate(postId, { '$pull': { 'likes': prevLike.id } });
            await prevLike.remove();
        }
    }

    static async getPaginatedPosts({ keyId, limit = 10 }: getPaginatedPostsOptionsT) {
        if (typeof keyId == 'undefined') {
            console.log('prevPosts undefined')
            return Post.find({}).sort({_id: -1}).limit(limit);
        }

        console.log('prevPosts')

        return Post.find({_id: {'$lt': keyId}}).sort({_id: -1}).limit(limit);
    }
}

// export class PostService {
//     async GetPaginated(offset: number, limit: number) {
//         // const posts = await Post.find({ $or: [{ type: 'post' }, { type: 'repost' }] }, null, { limit, offset })
//         // const posts = await Post.aggregate([
//         //     {$match: {}},
//         //     {$count: 'count'},
//         //     {$match: }
//         // ])
//         const firstPage = await Post.find().limit(3).exec();
//         console.log(firstPage);
//     }
// }

// type PaginationQueryOptionsT<T> {
//     query: QuerySelector<T>,
//     sort: [string, SortValues]
// }

// function getPaginatedPosts({ nextKeyFn }): ({ nextKeyFn: (Document[]) => ObjectId }): void {

// }
// type getPaginatedPostsT = (options: {
//     nextKeyFn: (posts: Document<IPost>[]) => ObjectId
// }) => string;
// const getPaginatedPosts: getPaginatedPostsT = (options) => {
//     const kek = options.nextKeyFn
//     return '';

// function generatePaginationQuery(options: PaginationQueryOptionsT) {
//     const sortField = sort == null ? null : sort[0];

//     function nextKeyFn(items) {
//       if (items.length === 0) {
//         return null;
//       }

//       const item = items[items.length - 1];

//       if (sortField == null) {
//         return { _id: item._id };
//       }

//       return { _id: item._id, [sortField]: item[sortField] };
//     }

//     if (nextKey == null) {
//       return { query, nextKeyFn };
//     }

//     let paginatedQuery = query;

//     if (sort == null) {
//       paginatedQuery._id = { $gt: nextKey._id };
//       return { paginatedQuery, nextKey };
//     }

//     const sortOperator = sort[1] === 1 ? "$gt" : "$lt";

//     const paginationQuery = [
//       { [sortField]: { [sortOperator]: nextKey[sortField] } },
//       {
//         $and: [
//           { [sortField]: nextKey[sortField] },
//           { _id: { [sortOperator]: nextKey._id } }
//         ]
//       }
//     ];

//     if (paginatedQuery.$or == null) {
//       paginatedQuery.$or = paginationQuery;
//     } else {
//       paginatedQuery = { $and: [query, { $or: paginationQuery }] };
//     }

//     return { paginatedQuery, nextKeyFn };
//   }
