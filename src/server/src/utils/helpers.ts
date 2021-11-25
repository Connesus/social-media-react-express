
import { IUser } from './../model/user';

export type SessionUserT = { userId: string, username: string }

export const sessionizeUser: (user: IUser) => SessionUserT = ({ id, username }: IUser) => ({ userId: id, username });