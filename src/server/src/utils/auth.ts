import { RequestHandler } from 'express';
const auth: { [key: string]: RequestHandler } = {
    isAuthenticated: (req, res, next) => {
        if (req.session.id && req.session.user) {
            next()
        } else {
            res.statusCode = 401;
            res.end('Authentication required')
        }
    }
}
export default auth;