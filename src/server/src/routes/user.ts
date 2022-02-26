import { Router } from "express";
import UserController from "../controller/user.js";
import { use } from "../utils/helpers.js";

const userRoutes = Router();

userRoutes.post("/register", use(UserController.register));
userRoutes.post("/login", use(UserController.login));
userRoutes.post("/logout", use(UserController.logout));
userRoutes.get("/check", use(UserController.check));
userRoutes.post("/id", use(UserController.getById));
userRoutes.get("/:username", use(UserController.get));

export default userRoutes;
