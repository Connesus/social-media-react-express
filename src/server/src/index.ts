import { config } from 'dotenv';
import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import { userAPI } from './api/user.js';

const dbURL = 'mongodb://database:27017';
mongoose.connect(dbURL, { useUnifiedTopology: true, useNewUrlParser: true } as ConnectOptions);
const connection = mongoose.connection;

connection.once("open", () => console.log("MongoDB database connection established successfully"));

config();
const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());
app.use(userAPI);

app.listen(port, () => console.log(`server is running on port ${port}`));
