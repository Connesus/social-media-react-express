// import {IImage} from './image.js';
// import {ILike} from './like.js';
// import mongoose, {Document, DocumentDefinition, ObjectId} from "mongoose";
// import { IUser } from "./user.js";
//
// const { model, Schema } = mongoose;
//
// export interface IPost extends Document {
//     author: IUser['_id']
//     createdAt: Date
//     text?: string
//     imageId?: IImage['_id']
//     replies?: IPost['_id'][]
//     likes?: ILike['_id'][]
//     reposts?: IPost['_id'][]
//     repostOf?: IPost['_id']
//     replyTo?: IPost['_id']
// }
//
// export interface IPostLean extends DocumentDefinition<IPost> { }
//
// const postSchema = new Schema<IPost>({
//     author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
//     createdAt: { type: Schema.Types.Date, required: true, default: new Date() },
//     text: String,
//     repostOf: { type: Schema.Types.ObjectId, ref: 'Post' },
//     replyTo: { type: Schema.Types.ObjectId, ref: 'Post' },
//     imageId: { type: Schema.Types.ObjectId, ref: 'Image' },
//     replies: { type: [Schema.Types.ObjectId], ref: 'Post', default: undefined },
//     likes: { type: [Schema.Types.ObjectId], ref: 'Like', default: undefined },
//     reposts: { type: [Schema.Types.ObjectId], ref: 'Post', default: undefined }
// })
//
//
// export const Post = model<IPost>('Post', postSchema);

import mongoose, {Document, Model, Types} from "mongoose";
import {IUserDoc} from "./user.js";
const { model, Schema } = mongoose;

export interface IPost {
    user: IUserDoc['_id'];
    createdAt: Date;
    imageId?: Types.ObjectId;
    text?: string;
    replyTo?: IPostDoc['_id'];
    repostOf?: IPostDoc['_id'];
}

export interface IPostDoc extends IPost, Document<Types.ObjectId> {}

export interface IPostModel extends Model<IPostDoc> {}

const PostSchema = new Schema<IPostDoc>({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },
    imageId: {
        type: mongoose.Types.ObjectId,
        ref: 'images'
    },
    text: String,
    replyTo: {
        type: mongoose.Types.ObjectId,
        ref: 'posts',
    },
    repostOf: {
        type: mongoose.Types.ObjectId,
        ref: 'posts',
    },
})

PostSchema.index({repostOf: 1});
PostSchema.index({replyTo: 1});
PostSchema.index({user: 1});

export const Post = model<IPostDoc, IPostModel>('posts', PostSchema, 'posts');
