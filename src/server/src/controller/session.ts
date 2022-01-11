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

            if (userData instanceof Error) {
                return res.json({error: 'Wrong password or user doesn\'t exist.'})
            }
            else if (userData && userData.password) {
                const sessionUser = sessionizeUser(userData)
                req.session.userData = sessionUser;
                return res.json(sessionUser);
            } else {
                return res.json({error: 'Wrong password or user doesn\'t exist.'})
            }
        } catch (error) {
            return res.json({error: 'Wrong password or user doesn\'t exist.'})
        }
    },
    logout: (req, res) => {
        try {
            const user = req.session.userData;
            if (user) {
                req.session.destroy(err => {
                    if (err) throw (err);

                    return res.clearCookie(SESS_NAME).send(user);
                })
            } else {
                throw new Error('Something went wrong')
            }
        } catch (error) {
            return res.status(500);
        }
    },
    check: (req, res) => {
        return res.json(req.session.userData || ({}));
    },
}

export default SessionController;
