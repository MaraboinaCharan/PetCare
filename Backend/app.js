import express from 'express';
import userRouter from './src/routes/user-route.js';
import connectDb from './src/config/mongodb-connection.js';
import authRouter from './src/routes/auth-route.js';
import petProfileRouter from './src/routes/petProfile-route.js';
import petHealthRouter from './src/routes/petHealth-route.js';
import cookieParser from 'cookie-parser';

const app=express();

connectDb();

app.use(express.json());
app.use(cookieParser());

app.use('/',authRouter);
app.use('/',userRouter);
app.use('/',petProfileRouter);
app.use('/',petHealthRouter);


export default app;

