import express from 'express';
import authController from '../controllers/auth-controller.js';
import userController from '../controllers/user-controller.js';

const userRouter=express.Router();

userRouter.patch('/updatePassword',authController.protectRoute,userController.updatePassword);
userRouter.patch('/updateUserData',authController.protectRoute,userController.updateUserData);
userRouter.delete('/deleteUser',authController.protectRoute,userController.deleteUser);


export default userRouter;