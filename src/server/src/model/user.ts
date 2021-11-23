import mongoose from "mongoose";
const { model, Schema, Error } = mongoose;

export interface User {
    username: string;
    email: string;
    password: string;
}

const schema = new Schema<User>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true }
})

const UserModel = model<User>('User', schema);

interface partialUserFilter {
    username?: string;
    email?: string;
    password?: string;
}

const get = async (userData: partialUserFilter) => {
    const user = await UserModel.findOne(userData)
        .catch((error: Error) => {
            console.error(error);
            return error;
        });
    return user;
}

const create = async (userData: User) => {
    return await UserModel.create(userData);
}

export default { get, create }