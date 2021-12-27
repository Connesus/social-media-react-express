import { RequestHandler } from "express"
import {UserService} from '../service/user.js';
import {sessionizeUser} from "../utils/helpers.js";

const userController: { [key: string]: RequestHandler } = {
    get: async (req, res) => {
        console.log(req.body);
        const result = await UserService.getUser(req.body);
        console.log(result);
        res.send(result);
        res.end();
    },

    create: async (req, res) => {
        const newUser = await UserService.createUser(req.body);
        const sessionUser = sessionizeUser(newUser);

        req.session.userData = sessionUser;
        res.send(sessionUser);
    },
}

export default userController;
