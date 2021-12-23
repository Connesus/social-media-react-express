
import { ObjectId } from 'mongoose';
import { IUser } from './../model/user';

export type SessionUserT = { id: string, username: string }

export const sessionizeUser: (user: IUser) => SessionUserT = ({ id, username }) => ({ id, username });