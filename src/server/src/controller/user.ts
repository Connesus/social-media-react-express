import { RequestHandler } from "express"
import {UserService} from '../service/user.js';
import {sessionizeUser} from "../utils/helpers.js";

const userController: { [key: string]: RequestHandler } = {
    get: async (req, res) => {
        const {username} = req.body
        const result = await UserService.getUserByUsername(username);
        console.log(result);

        return res.send(result);
    },

    create: async (req, res) => {
        const {username} = req.body
        const checkUsernameAvailability = await UserService.getUserByUsername(username);
        if (checkUsernameAvailability) {
            return res.json({error: 'Username already taken'});
        }
        const {password} = req.body;
        if (typeof username === 'string' && typeof password === "string" ) {
            const newUser = await UserService.createUser({username, password});
            const sessionUser = sessionizeUser(newUser);
            req.session.userData = sessionUser;
            return res.json(sessionUser);
        }
        return res.json({error: 'Invalid user data'})
    }
}

export default userController;
