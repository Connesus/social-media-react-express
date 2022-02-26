import { IUser, User } from "../model/user.js";
import mongoose from "mongoose";

export class UserService {
  static async getUsersById(ids: mongoose.Types.ObjectId[]) {
    return await User.find({ _id: { $in: ids } });
  }

  static async getUserByUsername(username: string) {
    return await User.findOne({ username: username }).catch((error: Error) => {
      console.error(error);
      return error;
    });
  }
  static async createUser(userData: IUser) {
    return await User.create(userData);
  }
  // static generateUserLoginFilter (login: UserLoginDataT['login']) {
  //   try {
  //     if (login.type === 'email') {
  //       return {email: login.email}
  //     } else if (login.type === 'username') {
  //       return {username: login.username}
  //     } else {
  //       throw new Error('ERROR: Missing login type property');
  //     }
  //   } catch (e) {
  //     console.log('bruh')
  //   }
  // }
}
