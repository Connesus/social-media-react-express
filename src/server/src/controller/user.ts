import { User } from '../model/user';
import { RequestHandler } from "express"
import user from '../model/user.js'

const userController: { [key: string]: RequestHandler } = {
    get: async (req, res) => {
        console.log(req.body);
        const result = await user.get(req.body);
        console.log(result);
        res.send(result);
        res.end();
    },

    create: async (req, res) => {
        const newUser: User = req.body;
        const result = await user.create(newUser);
        res.send(result);
        res.end();
    },
}

export default userController;