import express from 'express';
import authController from '../controllers/auth-controller.js';


const authRouter=express.Router();

authRouter.get('/user/login',authController.login)
authRouter.post('/user/signup',authController.signUp)
authRouter.post('/user/forgotPassword',authController.protectUserRoute,authController.forgotPassword);
authRouter.patch('/user/resetPassword/:token',authController.protectUserRoute,authController.resetPassword);
authRouter.post('/user/logout',authController.protectUserRoute,authController.logoutUser);


export default authRouter;