import dotenv from 'dotenv';
import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import { userAPI } from './api/user.js';

dotenv.config();
const connection = mongoose.connection;

connection.once("open", () => console.log("MongoDB database connection established successfully"));

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userAPI);

app.listen(port, () => console.log(`server is running on port ${port}`));
