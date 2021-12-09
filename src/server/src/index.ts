import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { userRoutes, sessionRouter, seedRouter, postRouter } from './routes/index.js';
import { PORT, MONGO_URI, MONGO_PORT, SESS_LIFETIME, SESS_NAME, SESS_SECRET, NODE_ENV } from './utils/config.js'
import auth from './utils/auth.js';

const mongoUrl = `${MONGO_URI}${MONGO_PORT}`;

(async () => {
    try {
        await mongoose.connect(mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true } as ConnectOptions);
        const dbClient = await mongoose.connection.getClient();
        console.log("MongoDB | connected");


        const app = express();
        app.disable('x-powered-by');
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use(session({
            name: SESS_NAME,
            secret: SESS_SECRET as string,
            resave: false,
            saveUninitialized: true,
            store: MongoStore.create({
                // @ts-ignore
                client: dbClient,
                dbName: 'test',
                collectionName: 'session',
                ttl: parseInt(SESS_LIFETIME as string) / 1000, // 1 Day
            }),
            cookie: {
                sameSite: true,
                secure: NODE_ENV === 'production',
                maxAge: parseInt(SESS_LIFETIME as string)
            }
        }))

        const apiRouter = express.Router();
        app.use('/api', apiRouter);
        apiRouter.use('/user', userRoutes);
        apiRouter.use('/session', sessionRouter);
        apiRouter.use('/seed', seedRouter)
        apiRouter.use('/post', auth.isAuthenticated, postRouter)


        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    } catch (error) {
        console.error(error)
    }
})()
