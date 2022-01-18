import dotenv from "dotenv";
dotenv.config();

const {
    PORT = 5000,
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
