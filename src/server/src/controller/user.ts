import { RequestHandler } from "express"
import {UserService} from '../service/user.js';
import {sessionizeUser} from "../utils/helpers.js";
import {User} from "../model/user.js";
import {Authentication} from "../model/authentication.js";
import {SESS_NAME} from "../utils/config.js";

const userController: { [key: string]: RequestHandler } = {
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
      // User.create(req.body)
      //   .then(user => {
      //       const auth = new Authentication({user: user._id})
      //       auth.hashAndSetPassword(req.body.password);
      //       return auth.save()
      //         .then(() => user)
      //   }).catch(next),

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
      // try {
      //   const userData = await UserService.getUserLogin(req.body);
      //
      //   if (userData instanceof Error) {
      //     return res.json({error: 'Wrong password or user doesn\'t exist.'})
      //   }
      //   else if (userData && userData.password) {
      //     const sessionUser = sessionizeUser(userData)
      //     req.session.userData = sessionUser;
      //     return res.json(sessionUser);
      //   } else {
      //     return res.json({error: 'Wrong password or user doesn\'t exist.'})
      //   }
      // } catch (error) {
      //   return res.json({error: 'Wrong password or user doesn\'t exist.'})
      // }
    },
    logout: (req, res) => {
      req.session.destroy((error: Error) => {
        if (error) throw error;
        return res.clearCookie(SESS_NAME).json({success: true});
      })
    },
    //     const user = req.session.userData;
    //     if (user) {
    //       req.session.destroy(err => {
    //         if (err) throw (err);
    //
    //         return res.clearCookie(SESS_NAME).send(user);
    //       })
    // },
    check: (req, res) => {
      return res.json(req.session.userData);
    },
}

export default userController;
