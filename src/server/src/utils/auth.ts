import { RequestHandler } from 'express';
import { NODE_ENV } from './config.js';
const auth: { [key: string]: RequestHandler } = {
    isAuthenticated: (req, res, next) => {
        if ((req.session.id && req.session.user) || NODE_ENV != 'production') {
            next()
            console.log('auth')
        } else {
            res.statusCode = 401;
            res.end('Authentication required')
        }
    }
}
export default auth;