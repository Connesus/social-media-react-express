import { RequestHandler } from "express";
import { NODE_ENV } from "./config.js";

interface IAuthController {
  // isAuthenticated: (req: Request & {session: Session}, res: Response) => void;
  [key: string]: RequestHandler;
}

const auth: IAuthController = {
  isAuthenticated: (req, res, next) => {
    if ((req.session.id && req.session.userData) || NODE_ENV != "production") {
      console.log("auth");
      return next();
    } else {
      res.statusCode = 401;
      res.end("Authentication required");
    }
  },
};
export default auth;
