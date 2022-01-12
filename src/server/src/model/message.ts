import mongoose, {Document, Model, Types} from "mongoose";
import {IUserDoc} from "./user.js";
const { model, Schema } = mongoose;


export interface IMessage {
  sender: IUserDoc["_id"];
  receiver: IUserDoc["_id"];
  text: string;
  createdAt: Date;
  seen?: Boolean;
}

export interface IMessageDoc extends IMessage, Document<Types.ObjectId> {}
export interface IMessageModel extends Model<IMessageDoc> {}


const MessageSchema = new Schema<IMessageDoc, IMessageModel>({
  sender: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    required: true
  },
  receiver: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  seen: Boolean
})

MessageSchema.index({sender: 1, receiver: 1, createdAt: -1 });
MessageSchema.index({receiver: 1, sender: 1, createdAt: -1 });

export const Message = model<IMessageDoc, IMessageModel>('messages', MessageSchema, 'messages');
