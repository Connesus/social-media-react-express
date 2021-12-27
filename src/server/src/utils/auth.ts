import {Request, RequestHandler, Express, Response} from 'express';
import { NODE_ENV } from './config.js';
import {ParamsDictionary} from "express-serve-static-core";
import {Session} from "express-session";

interface IAuthController {
    // isAuthenticated: (req: Request & {session: Session}, res: Response) => void;
    [key: string]: RequestHandler;
}

const auth: IAuthController = {
    isAuthenticated: (req, res, next) => {
        console.log(req.session)
        if ((req.session.id && req.session.userData) || NODE_ENV != 'production') {
            next()
            console.log('auth')
        } else {
            res.statusCode = 401;
            res.end('Authentication required')
        }
    }
}
export default auth;
