import express from 'express';
import userRouter from './src/routes/user-route.js';
import connectDb from './src/config/mongodb-connection.js';
import authRouter from './src/routes/auth-route.js';
import petProfileRouter from './src/routes/petProfile-route.js';
import petHealthRouter from './src/routes/petHealth-route.js';
import cookieParser from 'cookie-parser';
import petDoctorRouter from './src/routes/petDoctor-route.js';

const app=express();

connectDb();

app.use(express.json());
app.use(cookieParser());

app.use('/user',authRouter);
app.use('/user',userRouter);
app.use('/',petProfileRouter);
app.use('/',petHealthRouter);
app.use('/petDoctor',petDoctorRouter);


export default app;

