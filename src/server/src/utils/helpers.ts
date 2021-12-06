
import { ObjectId } from 'mongoose';
import { IUser } from './../model/user';

export type SessionUserT = { id?: ObjectId, username?: string }

export const sessionizeUser: (user: IUser) => SessionUserT = ({ id, username }) => ({ id, username });