import { UserModel } from '../model/user.js';
import { RequestHandler } from "express"
import User from '../model/user.js'

const userController: { [key: string]: RequestHandler } = {
    get: async (req, res) => {
        console.log(req.body);
        const result = await User.get(req.body);
        console.log(result);
        res.send(result);
        res.end();
    },

    create: async (req, res) => {
        const newUser = new UserModel(req.body);
        const sessionUser = { userId: newUser.id, username: newUser.username }
        await newUser.save();

        req.session.user = sessionUser;
        res.send(sessionUser);
    },
}

export default userController;