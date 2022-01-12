export { };
import {SchemaDefinition} from "mongoose";
import {IUserDoc} from "../model/user.js";
// Session cookie declaration
declare module 'express-session' {


    interface SessionData {
        userData: SchemaDefinition<IUserDoc>
    }
}

// Environment variables declaration

declare namespace NodeJS {
    export interface ProcessEnv {
        NODE_ENV: "development" | "production" | "test";
        PORT: string;
        MONGO_URI: string;
        MONGO_PORT: string;
        SESS_NAME: string;
        SESS_SECRET: string;
        SESS_LIFETIME: string;
    }
}
