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

// @ts-ignore
UserModel.collection.getIndexes().then(indexes => {
    console.log("indexes:", indexes);
    // ...
}).catch(console.error);


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