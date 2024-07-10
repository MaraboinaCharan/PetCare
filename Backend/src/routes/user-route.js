import express from 'express';
import { protectRoute } from '../controllers/auth-controller.js';
import { deleteUser, updatePassword, updateUserData } from '../controllers/user-controller.js';
const userRouter=express.Router();

userRouter.patch('/updatePassword',protectRoute,updatePassword);
userRouter.patch('/updateUserData',protectRoute,updateUserData);
userRouter.delete('/deleteUser',protectRoute,deleteUser);


export default userRouter;