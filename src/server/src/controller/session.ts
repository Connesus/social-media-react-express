import { RequestHandler } from "express"
import User from '../model/user.js'
import { sessionizeUser } from '../utils/helpers.js';
import { SESS_NAME } from '../utils/config.js'

const SessionController: { [key: string]: RequestHandler } = {
    login: async (req, res, next) => {
        try {
            console.log('vine boom sfx')
            const { email, password } = req.body;
            console.log(email, password)

            const user = await User.get({ email });

            if (user instanceof Error) {
                next(user);
                console.log('error')
            } else if (user && user.password === password) {
                console.log('good')
                const sessionUser = sessionizeUser(user);
                req.session.user = sessionUser;
                res.send(sessionUser);
            } else {
                console.log('error 2')
                throw new Error('Invalid login credentials')
            }
        } catch (error) {
            res.status(401).send(JSON.stringify(error, Object.getOwnPropertyNames(error)))
        }
    },
    logout: (req, res) => {
        try {
            const user = req.session.user;
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
        res.send(req.session.user);
    },
}

export default SessionController;