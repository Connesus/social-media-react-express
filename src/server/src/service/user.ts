import {IUser, UserModel} from "../model/user.js";
import {UserLoginDataT} from "@shared/types";

interface IPartialUserFilter {
    username?: string;
    email?: string;
    password?: string;
}



export class UserService {
  static async getUser(userData: IPartialUserFilter) {
    return await UserModel.findOne(userData)
      .catch((error: Error) => {
        console.error(error);
        return error;
      });
  }
  static async createUser (userData: IUser) {
    return await UserModel.create(userData);
  }
  static generateUserLoginFilter (login: UserLoginDataT['login']) {
    if (login.type === 'email') {
      return {email: login.email}
    } else if (login.type === 'username') {
      return {username: login.username}
    } else {
      throw new Error('ERROR: Missing login type property');
    }
  }
  static async getUserLogin ({password, login}: UserLoginDataT) {
    const user = await UserModel.findOne(this.generateUserLoginFilter(login));

    if (user && user.password === password) {
      return user;
    }

    return new Error('ERROR: Login error')
  }
}
