import { RequestHandler } from "express"
import {UserService} from '../service/user.js';
import {User} from "../model/user.js";
import {Authentication} from "../model/authentication.js";
import {SESS_NAME} from "../utils/config.js";
import {parseIdStr} from "../utils/helpers.js";

const userController: { [key: string]: RequestHandler } = {
  getById: async (req, res) => {
    const id = parseIdStr(req.body.id)
    if (!id) throw new Error('error');
    const user = await User.findById(id);
    if (user) {
      res.json(user)
    }
    res.status(404).end()
  },
  get: async (req, res) => {
      const {username} = req.body
      const result = await UserService.getUserByUsername(username);
      console.log(result);

      return res.send(result);
  },

  register: async (req, res, next) => {
      const checkUser = await User.findOne({username: req.body.username});
      if (checkUser) throw new Error('Registration: Username already taken.');

      const user = await User.create(req.body);
      const auth = new Authentication({user: user._id});

      await auth.hashAndSetPassword(req.body.password);
      await auth.save();

      return res.json(user);
    },

    login: async (req, res, next) => {
      const {username, password} = req.body;
      const user = await User.findOne({username});
      if (!user) throw new Error('Login: Username doesn\'t exist.');

      const auth = await Authentication.findOne({user: user._id});
      if (auth && await auth.verifyPassword(password)) {
        req.session.userData = user;
        return res.json(user);
      }
      throw new Error('Login: Wrong password.')
    },

    logout: (req, res) => {
      req.session.destroy((error: Error) => {
        if (error) throw error;
        return res.clearCookie(SESS_NAME).json({success: true});
      })
    },

    check: (req, res) => {
      return res.json(req.session.userData || ({}));
    },
}


export default userController;
