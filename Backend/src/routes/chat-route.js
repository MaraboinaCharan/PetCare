import express from 'express';
import authController from '../controllers/auth-controller.js';
import chatController from '../controllers/chat-controller.js';

const chatRouter=express.Router();


chatRouter.post('/user/sendMessage',authController.protectUserRoute,chatController.sendMessage);
chatRouter.get('/user/:chatId/history',authController.protectUserRoute,chatController.getChatHistory);
chatRouter.post('/user/createChat',authController.protectUserRoute,chatController.createChat);

chatRouter.post('/petdoctor/sendMessage',authController.protectPetDoctorRoute,chatController.sendMessage);
chatRouter.get('/petDoctor/:chatId/history',authController.protectPetDoctorRoute,chatController.getChatHistory);
chatRouter.post('/petDoctor/createChat',authController.protectPetDoctorRoute,chatController.createChat);

export default chatRouter;
