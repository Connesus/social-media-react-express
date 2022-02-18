import express, {Router} from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { userRoutes, postRouter, staticRouter } from './routes/index.js';
import { PORT, MONGO_URI, MONGO_PORT, SESS_LIFETIME, SESS_NAME, SESS_SECRET, NODE_ENV } from './utils/config.js'
import {errorHandler, parseIdStr} from "./utils/helpers.js";
import {Server} from 'socket.io';
import {createServer} from "http";
import cookie from 'cookie';
// @ts-ignore
import cookieParser from 'cookie-parser';
import {User} from "./model/user.js";
import {Message} from "./model/message.js";

const mongoUrl = `${MONGO_URI}${MONGO_PORT}`;

const app = express();

app.set('trust proxy', true);

const server = createServer(app);
export const io = new Server(server, {
    path: '/sckt'
});


io.use(async (socket, next) => {
    const sid = cookie.parse(socket.request.headers.cookie || '');
    console.log(sid)
    if (!sid) return next(Error('Invalid sid'));
    const unsigned = cookieParser.signedCookie(sid.sid, SESS_SECRET);
    console.log('unsigned', unsigned)
    if (!unsigned) return next(Error('Error with unsigned cookie'));
    const sessionCollection = await mongoose.connection.collection('session');
    // @ts-ignore
    const dbSession = await sessionCollection.findOne({_id: unsigned});
    // @ts-ignore
    if (!dbSession) return next(Error('Session not found'));
    // @ts-ignore
    const sessionData = JSON.parse(dbSession.session);
    const _id = sessionData?.userData?._id;

    if (!_id) return next(Error('No user data found'));

    // @ts-ignore
    socket["id"] = _id;

    next();
});


io.on('connection', async (socket) =>  {
    socket.on('sendMessage', async ({receiver, text}, ackFn) => {
        console.log('sendMessagee', receiver, text)
        if (receiver && text) {
            console.log('sendMessage', )
            const receiverExists = await User.exists({_id: receiver});
            if (!receiverExists) throw new Error('Receiver doesn\'t exist')
            const newMessage = await Message.create({sender: socket.id, receiver, text})
            console.log('sendMessage', newMessage)
            await io.to(receiver).emit('receiveMessage', newMessage);
            ackFn(newMessage);
        }
    })

    socket.on('fetchAllChatMessages', async (payload, ackFn) => {
        const id = parseIdStr(payload);
        const allMessages = await Message.find({$or: [
          {sender: id, receiver: socket.id}, {receiver: id, sender: socket.id}
        ]})
        console.log('allMessages', allMessages.length)
        if (allMessages) {
            ackFn(allMessages);
        }
    })

    socket.on('fetchAllChats',  async (payload, ackFn) => {
        const userId = parseIdStr(socket.id);
        console.log('userId',userId);
        const allMessages = await Message.aggregate([
            {$match: {$or: [{sender: userId}, {receiver: userId}]}},
            {$sort: {createdAt: -1}},
            {$group: {
                _id: {sender: "$sender", receiver: "$receiver"},
                lastMessage: { $first: "$$ROOT"}
                // top: {$topN: { n: 2, sortBy: { submitted: -1 } }}
                // messages: {$push: "$$ROOT"}
            }},
        ])

        if (allMessages) {
            ackFn(allMessages)
        }
        // console.log(allMessages)
    })


});

(async () => {
    try {
        await mongoose.connect(mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true } as ConnectOptions);
        const dbClient = await mongoose.connection.getClient();
        console.log("MongoDB | connected");


        app.disable('x-powered-by');
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader(
              "Access-Control-Allow-Methods",
              "OPTIONS, GET, POST, PUT, PATCH, DELETE"
            );
            res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
            next();
        });

        app.use(session({
            name: SESS_NAME,
            secret: SESS_SECRET as string,
            resave: false,
            saveUninitialized: true,
            proxy: true,
            store: MongoStore.create({
                // @ts-ignore
                client: dbClient,
                dbName: 'test',
                collectionName: 'session',
                ttl: parseInt(SESS_LIFETIME as string) / 1000, // 1 Day
            }),
            cookie: {
                sameSite: NODE_ENV !== 'development',
                secure: NODE_ENV !== 'development',
                maxAge: parseInt(SESS_LIFETIME as string),
                path: '/',
                httpOnly: false,
            }
        }))

        const apiRouter = express.Router();
        app.use('/static', staticRouter)
        app.use('/api', apiRouter);
        apiRouter.use('/user', userRoutes);
        apiRouter.use('/post', postRouter);
        apiRouter.use('/a', Router().get('', () => console.log('a')))

        app.use(errorHandler);

        app.use(function(req, res){
            res.status(404).end();
        });

        server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    } catch (error) {
        console.error('ERROR:', error)
    }
})()
