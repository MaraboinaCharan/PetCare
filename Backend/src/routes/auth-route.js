import express from 'express';
import authController from '../controllers/auth-controller.js';


const authRouter=express.Router();

authRouter.get('/',authController.login)
authRouter.post('/signup',authController.signUp)
authRouter.post('/forgotPassword',authController.protectRoute,authController.forgotPassword);
authRouter.patch('/resetPassword/:token',authController.protectRoute,authController.resetPassword);
authRouter.post('/logout',authController.protectRoute,authController.logoutUser);


export default authRouter;