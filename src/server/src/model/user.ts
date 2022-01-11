import mongoose, {Document, SchemaDefinition} from "mongoose";
import {IPost} from "./post.js";
const { model, Schema } = mongoose;

export interface IUser extends Document {
    username: string;
    email?: string;
    password: string;
    posts?: IPost["_id"][] | undefined
}

export interface IUserDef extends SchemaDefinition<IUser> {}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, index: true },
    posts: {type: [Schema.Types.ObjectId], ref: 'Post', default: undefined}
})

export const UserModel = model<IUser>('User', userSchema);
export const UserCollectionName = UserModel.collection.collectionName;
