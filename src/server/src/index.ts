import dotenv from 'dotenv';
import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { userRoutes } from './routes/index.js';

dotenv.config();
const { PORT, MONGO_URI, MONGO_PORT, SESS_NAME, SESS_SECRET, SESS_LIFETIME } = process.env;
const mongoUrl = `${MONGO_URI}${MONGO_PORT}`;

(async () => {
    try {
        await mongoose.connect(mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true } as ConnectOptions);
        console.log("MongoDB | connected");

        const app = express();
        app.disable('x-powered-by');
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use(session({
            secret: SESS_SECRET as string,
            resave: false,
            saveUninitialized: true,
            store: MongoStore.create({
                mongoUrl,
                ttl: 60 * 60 * 24, // 1 Day
            })
        }))

        const apiRouter = express.Router();
        app.use('/api', apiRouter);
        apiRouter.use('/user', userRoutes);

        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    } catch (error) {
        console.error(error)
    }
})()
