import express from 'express';
import userRouter from './src/routes/user-route.js';
import connectDb from './src/config/mongodb-connection.js';

const app=express();

connectDb();

app.use(express.json());

app.use('/',userRouter);

export default app;

