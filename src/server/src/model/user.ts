import mongoose from "mongoose";
const { model, Schema } = mongoose;

export interface IUser {
    username: string;
    email: string;
    password: string;
    id: string;
}

const schema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true }
})

export const UserModel = model<IUser>('User', schema);

interface IPartialUserFilter {
    username?: string;
    email?: string;
    password?: string;
}

const get = async (userData: IPartialUserFilter) => {
    const user = await UserModel.findOne(userData)
        .catch((error: Error) => {
            console.error(error);
            return error;
        });
    return user;
}

const create = async (userData: IUser) => {
    return await UserModel.create(userData);
}

export default { get, create }