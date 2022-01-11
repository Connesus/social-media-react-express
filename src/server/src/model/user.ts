import mongoose, {Document, Model, Types} from "mongoose";
const { model, Schema } = mongoose;

export interface IUser {
    username: string;
    description?: string
    imageId?: mongoose.Types.ObjectId;
    createdAt: Date;
}

export interface IUserDoc extends IUser, Document<Types.ObjectId> {}

export interface IUserModel extends Model<IUserDoc> {}

const UserSchema = new Schema<IUserDoc>({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    imageId: {
        type: mongoose.Types.ObjectId,
        ref: 'Image'
    },
    createdAt: {
        type: Date,
        required: true
    }
})

UserSchema.pre<IUserDoc>('save', function (next) {
    if (!this.createdAt) this.createdAt = new Date();
    next();
})

export const User = model<IUserDoc, IUserModel>('users', UserSchema, 'users');
export const UserCollectionName = User.collection.collectionName;
