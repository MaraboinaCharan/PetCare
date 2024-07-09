import express from 'express';
import signUp from '../controllers/user-controller.js';
import { login } from '../controllers/user-controller.js';
import { protectRoute } from '../controllers/user-controller.js';
const userRouter=express.Router();

userRouter.get('/',login)
userRouter.post('/signup',signUp)
//use protectRoute for other routes


export default userRouter;