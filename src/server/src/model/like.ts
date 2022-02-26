// import { IUser, UserModel } from './user.js';
// import { IPost, Post } from './post.js';
// import mongoose, { Document } from "mongoose";
// const { Schema, model } = mongoose
//
//
// export interface ILike extends Document {
//     postId: IPost['id'];
//     userId: IUser['id'];
// }
//
//
// const likeSchema = new Schema<ILike>({
//     postId: { type: Schema.Types.ObjectId, required: true, index: true },
//     userId: { type: Schema.Types.ObjectId, required: true, index: true }
// })
//
// export const LikeModel = model<ILike>('Like', likeSchema);

import mongoose, { Document, Model, Types } from "mongoose";
import { IPostDoc } from "./post.js";
import { IUserDoc } from "./user.js";
const { model, Schema } = mongoose;

export interface ILike {
  postId: IPostDoc["_id"];
  userId: IUserDoc["_id"];
}

export interface ILikeDoc extends ILike, Document<Types.ObjectId> {}
export type ILkeModel = Model<ILikeDoc>;

const LikeSchema = new Schema<ILikeDoc>({
  postId: {
    type: mongoose.Types.ObjectId,
    ref: "posts",
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

LikeSchema.index({ postId: 1 });

export const Like = model<ILikeDoc, ILkeModel>("likes", LikeSchema, "likes");
