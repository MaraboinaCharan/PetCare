import express from 'express';
import signUp, { logoutUser, protectRoute } from '../controllers/auth-controller.js';
import { login } from '../controllers/auth-controller.js';
import { forgotPassword } from '../controllers/auth-controller.js';
import { resetPassword } from '../controllers/auth-controller.js';

const authRouter=express.Router();

authRouter.get('/',login)
authRouter.post('/signup',signUp)
authRouter.post('/forgotPassword',protectRoute,forgotPassword);
authRouter.patch('/resetPassword/:token',protectRoute,resetPassword);
authRouter.post('/logout',protectRoute,logoutUser);


export default authRouter;