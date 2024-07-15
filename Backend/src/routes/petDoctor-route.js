import express from 'express';
import authController from '../controllers/auth-controller.js';
import userController from '../controllers/user-controller.js';


const petDoctorRouter=express.Router();

petDoctorRouter.get('/petDoctor/login',authController.login)
petDoctorRouter.post('/petDoctor/signup',authController.signUp)
petDoctorRouter.post('/petDoctor/forgotPassword',authController.protectPetDoctorRoute,authController.forgotPassword);
petDoctorRouter.patch('/petDoctor/resetPassword/:token',authController.protectPetDoctorRoute,authController.resetPassword);
petDoctorRouter.post('/petDoctor/logout',authController.protectPetDoctorRoute,authController.logoutUser);
petDoctorRouter.patch('/petDoctor/updatePassword',authController.protectPetDoctorRoute,userController.updatePassword);
petDoctorRouter.patch('/petDoctor/updateUserData',authController.protectPetDoctorRoute,userController.updateUserData);
petDoctorRouter.delete('/petDoctor/deleteUser',authController.protectPetDoctorRoute,userController.deleteUser);

export default petDoctorRouter;