
import { ObjectId } from 'mongoose';
import { IUser } from './../model/user';
import {SessionUserT} from "@shared/types";

export const sessionizeUser: (user: IUser) => SessionUserT = ({ id, username }) => ({ id, username });
