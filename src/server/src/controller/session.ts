import { RequestHandler } from "express"
import { sessionizeUser } from '../utils/helpers.js';
import { SESS_NAME } from '../utils/config.js'
import {UserService} from "../service/user.js";
import {ParamsDictionary} from "express-serve-static-core";
import {UserLoginDataT} from "@shared/types";

interface ISessionController {
    [key: string]: RequestHandler;
    login: RequestHandler<ParamsDictionary,any, UserLoginDataT>
}

const SessionController: ISessionController = {
    login: async (req, res, next) => {
        try {
            const userData = await UserService.getUserLogin(req.body);

            if (userData instanceof Error) {throw userData}
            else if (userData && userData.password) {
                const sessionUser = sessionizeUser(userData)
                req.session.userData = sessionUser;
                res.json(sessionUser);
            } else {
                throw new Error('Invalid login credentials')
            }
        } catch (error) {
            res.status(401).send(JSON.stringify(error, Object.getOwnPropertyNames(error)))
        }
    },
    logout: (req, res) => {
        try {
            const user = req.session.userData;
            if (user) {
                req.session.destroy(err => {
                    if (err) throw (err);

                    res.clearCookie(SESS_NAME);
                    res.send(user);
                })
            } else {
                throw new Error('Something went wrong')
            }
        } catch (error) {
            res.status(422).send(JSON.stringify(error, Object.getOwnPropertyNames(error)))
        }
    },
    check: (req, res) => {
        res.json(req.session.userData || ({}));
    },
}

export default SessionController;
