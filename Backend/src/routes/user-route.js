import express from 'express';
import authController from '../controllers/auth-controller.js';
import userController from '../controllers/user-controller.js';

const userRouter=express.Router();

userRouter.patch('/user/updatePassword',authController.protectUserRoute,userController.updatePassword);
userRouter.patch('/user/updateUserData',authController.protectUserRoute,userController.updateUserData);
userRouter.delete('/user/deleteUser',authController.protectUserRoute,userController.deleteUser);



export default userRouter;