import { IUser, UserModel } from './user.js';
import { IPost, Post } from './post.js';
import mongoose, { Document } from "mongoose";
const { Schema, model } = mongoose


export interface ILike extends Document {
    postId: IPost['id'];
    userId: IUser['id'];
}


const likeSchema = new Schema<ILike>({
    postId: { type: Schema.Types.ObjectId, required: true },
    userId: { type: Schema.Types.ObjectId, required: true }
})

export const LikeModel = model<ILike>('Like', likeSchema);
