import dotenv from "dotenv";
dotenv.config();

declare global {
    namespace NodeJS {
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
}

const {
    PORT = 8081,
    MONGO_URI = 'mongodb://localhost:',
    MONGO_PORT = 27017,
    SESS_NAME = 'sid',
    SESS_SECRET = 'secret',
    SESS_LIFETIME = 86400000,
    NODE_ENV = 'development',
} = process.env;


export {
    PORT,
    MONGO_URI,
    MONGO_PORT,
    SESS_NAME,
    SESS_SECRET,
    SESS_LIFETIME,
    NODE_ENV,
};
