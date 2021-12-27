import { IImage } from './image.js';
import { ILike } from './like.js';
import mongoose, { Document, DocumentDefinition } from "mongoose";
import { UserModel, IUser } from "./user.js";

const { model, Schema } = mongoose;

export interface IPost extends Document {
    type: 'post' | 'repost' | 'reply'
    repostOf?: IPost['_id']
    replyTo?: IPost['_id']
    createdAt: Date;
    postedBy: IUser['_id'];
    text: string;
    imageId: IImage['_id'];
    replies: IPost['_id'][];
    likes: ILike['_id'][]
}

export interface IPostDefinitions extends DocumentDefinition<IPost> { };

const postSchema = new Schema<IPost>({
    type: { type: String, required: true },
    repostOf: Schema.Types.ObjectId,
    replyTo: Schema.Types.ObjectId,
    createdAt: { type: Schema.Types.Date, required: true },
    postedBy: { type: Schema.Types.ObjectId, required: true, ref: UserModel },
    text: String,
    imageId: Schema.Types.ObjectId,
    replies: [{ type: Schema.Types.ObjectId, ref: this }],
    likes: [{ type: Schema.Types.ObjectId }]
})

export const Post = model<IPost>('Post', postSchema);
