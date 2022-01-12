import {IUser,User} from "../model/user.js";
import {UserLoginDataT} from "@shared/types";
import mongoose from "mongoose";



export class UserService {
  static async getUsersById(ids: mongoose.Types.ObjectId[], showEmail = false) {
    return User.aggregate([
      {$match: {_id: {$in: ids}}},
      {$project: {__v: 0, password: 0}},
      {$project: {email: showEmail ? 1 : 0}}
    ])
  }

  static async getUserByUsername(username: string) {
    return await User.findOne({'username': username})
      .catch((error: Error) => {
        console.error(error);
        return error;
      });
  }
  static async createUser (userData: IUser) {
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
  static async getUserLogin ({password, username}: UserLoginDataT) {
    const user = await UserService.getUserByUsername(username);

    if (user instanceof Error) {
      return user;
    }

    if (user && user.password === password) {
      return user;
    }

    return new Error('ERROR: Login error')
  }
}
