import { Like } from '../model/like.js';
import {
    MongooseQueryOptions,
    FilterQuery,
    PipelineStage
} from "mongoose";
import mongoose from 'mongoose';
import {IUser, IUserDoc, UserCollectionName} from "../model/user.js";
import {IPost, IPostDoc, Post} from "../model/post.js";
import {LikeService} from "./like.js";
import {UserService} from "./user.js";


type getPaginatedPostsOptionsT = {
    // query: FilterQuery<IPost>,
    // prevPosts?: IPost[] | Falsy,
    id: IPostDoc['_id'] | undefined
    limit?: number
    userId?: mongoose.Types.ObjectId;
};

const postCounterFieldPipeline: PipelineStage =   {
  $addFields: {
    "counter.likeCount": {$size:  {"$cond": [{ "$isArray": "$likes" },"$likes", []]}},
    "counter.replyCount": {$size:  {"$cond": [{ "$isArray": "$replies" },"$replies", []]}},
    "counter.repostCount": {$size:  {"$cond": [{ "$isArray": "$reposts" },"$reposts", []]}}
}};

const postUserInteractionFieldPipeline: (userId?: mongoose.Types.ObjectId) => PipelineStage[] | [] = (userId) =>
  userId ?
  ([{
  $addFields: {
    "user.hasLiked": {$in: [userId, {"$cond": [{ "$isArray": "$likes" },"$likes", []]}]},
    "user.hasReposted": {$in: [userId, {"$cond": [{ "$isArray": "$reposts" },"$reposts", []]}]},
  }}]) : []

const projectPostPipeline: PipelineStage = {$project: {likes: 0, replies: 0, reposts: 0, __v: 0}};
const projectUserSecretsPipeline: PipelineStage = {$project: {password: 0, email: 0, __v: 0}};


//        "contentType": {$switch: {
//                 branches: [
//                     {case: {$and: ["$imageId",  "$text"]}, then: "mixed"},
//                     {case: {$and: ['$text', {$not: '$imageId'}]}, then: "text"},
//                     {case: {$and: ['$imageId', {$not:  '$text'}]}, then: "image"},
//                 ],
//             }}

const postAuthorLookupPipeline: PipelineStage = {
  $lookup: {
    from: UserCollectionName,
    localField: 'author',
    foreignField: '_id',
    as: 'authorData'
  }};

const postUserProjectPipeline: PipelineStage = {
  $project: {likes: 0, replies: 0, __v: 0, "authorData.password": 0, "authorData.email": 0}
}

const separateUsersPipeline: PipelineStage[] = [
  {$facet: {
        "posts": [
            {$project: {authorData: 0}},
            {$addFields: {
                    "arrToObj": {
                        "k": { $toString: "$_id"},
                        "v": "$$ROOT"
                    }
                }},
            {$replaceRoot: {newRoot: "$arrToObj"}}
        ],
        "users": [
            {$unwind: "$authorData"},
            {$addFields: {
                    "arrToObj": {
                        "k": { $toString: "$authorData._id"},
                        "v": "$authorData"
                    }
                }},
            {$replaceRoot: {newRoot: "$arrToObj"}}
        ]
    }},
    {$addFields: {
            "users": {$arrayToObject: "$users"},
            "posts": {$arrayToObject: "$posts"}
        }}]

export class PostService {
    async findPost(
        query: FilterQuery<IPost>,
        options: MongooseQueryOptions = { lean: true }
    ) {

    }

    static async findPostsById(ids: mongoose.Types.ObjectId[], userId?: mongoose.Types.ObjectId, postsOnly?: boolean) {
      console.log('userId findbyid', ids)
        return Post.aggregate([
          {$match: {_id: {$in: ids}}},
          postCounterFieldPipeline,
          ...(postUserInteractionFieldPipeline(userId)),
          projectPostPipeline
        ]);
        // if (postsOnly) return {posts, users: []};
        //
        // const authorIds = posts.map(post => new mongoose.Types.ObjectId(post.author));
        // const users = await UserModel.aggregate([
        //   {$match: {_id: {$in: authorIds}}},
        //   projectUserSecretsPipeline
        // ])
        //
        // return {posts, users}
    }


    static async createPost({ createdAt, user, text, imageId, repostOf, replyTo }: IPost) {
        console.log(imageId)
        const newPost = new Post({ user, imageId, createdAt, text, repostOf, replyTo })
        await newPost.save()
      return newPost;
    }

    static async deletePost(
      postId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId
    ) {
        const post = await Post.findById(postId);
        if (post == null) return { status: 404, message: 'Couldn\'t delete post: post not found' }
        if (post.user == userId) {
            await post.remove();
            return { status: 200, message: 'Post deleted.' }
        }
        return { status: 403, message: 'You can delete only your posts.' }

    }

    static async likePost(id: string, userId: IUserDoc['_id']) {
      console.log(id, userId)
      const postObjId = new mongoose.Types.ObjectId(id)
      const userObjId = new mongoose.Types.ObjectId(userId)

        const prevLike = await LikeService.getByUserAndPostIds(userObjId,postObjId)
      console.log(prevLike)

        if (prevLike.length) {
          console.log('remove like');
          await Post.findByIdAndUpdate(id, { '$pull': { 'likes': userObjId } });
          // await prevLike[0].remove();
          await Like.deleteOne({_id: prevLike[0]._id})
        } else {
          console.log('add like');
          const newLike = new Like({ postId: postObjId, userId: userObjId })
          await newLike.save();
          await Post.findByIdAndUpdate(id, { "$push": { 'likes': userObjId } })
        }
    }

    static async getPaginatedPosts({ id, limit = 10, userId }: getPaginatedPostsOptionsT) {
        if (typeof id == 'undefined') {
            console.log('prevPosts undefined')
            return Post.aggregate([
              {$match: {}},
              {$sort: {_id: -1}},
              {$limit: limit},
              postCounterFieldPipeline,
              ...postUserInteractionFieldPipeline(userId),
              projectPostPipeline
            ])
        }


        return Post.aggregate([
          {$match: {_id: {'$lt': id}}},
          {$sort: {_id: -1}},
          {$limit: limit},
          postCounterFieldPipeline,
          ...postUserInteractionFieldPipeline(userId),
          projectPostPipeline
        ])
        // return Post.find({_id: {'$lt': keyId}}).sort({_id: -1}).limit(limit);
    }

    static async getUserPostsByUsername(username: string, sessionUserId?: string) {
      const user = await UserService.getUserByUsername(username);

      if (user instanceof Error) {
        console.error(user)
        return user;
      }
      if (user) {
        const postIds = user?.posts?.map((id: string) => new mongoose.Types.ObjectId(id)) || [];
        const posts = await this.findPostsById(postIds, new mongoose.Types.ObjectId(sessionUserId));

        return {posts, users: [user]}
      }
    }

    static async replyToPostById(id: mongoose.Types.ObjectId, postId: mongoose.Types.ObjectId) {
      return Post.findByIdAndUpdate(id, { "$push": { 'replies': postId } })
    }

    static async repostPost(postId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) {

      const aggregateHasReposted = await Post.aggregate([
        {$match: {_id: postId}},
        {$addFields: {
          "hasReposted": {$in: [userId, {"$cond": [{ "$isArray": "$reposts" },"$reposts", []]}]}
          }}])
      console.log('aggregateHasReposted',aggregateHasReposted);

      if (aggregateHasReposted[0] && aggregateHasReposted[0].hasReposted) {
        await Post.findByIdAndUpdate(postId, { '$pull': { 'reposts': userId } });
        await Post.deleteOne({author: userId, repostOf: postId});

      } else if (aggregateHasReposted[0] && !aggregateHasReposted[0].hasReposted) {
        await Post.findByIdAndUpdate(postId, { '$push': { 'reposts': userId } });
        return (await Post.create({author: userId, repostOf: postId}))._id;
      }
      // const postToRepost = await Post.findById(postId);
      //
      // const newPost = await Post.create({author: userId, repostOf: postId});
      // await Post.updateOne(
      //   {_id: postId},
      //   {$push: {reposts: newPost._id}}
      // )
      // const posts = await PostService.findPostsById([postId, newPost._id], userId)

    }
}
