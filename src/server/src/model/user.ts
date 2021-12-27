import mongoose, { Document } from "mongoose";
const { model, Schema } = mongoose;

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true }
})

export const UserModel = model<IUser>('User', userSchema);
