import express from 'express';
import authController from '../controllers/auth-controller.js';
import petHealthController from '../controllers/petHealth-controller.js';

const petHealthRouter=express.Router();

petHealthRouter.post('/user/addPetHealthInfo/:petId',authController.protectUserRoute,petHealthController.addPetHealthInfo);
petHealthRouter.get('/user/getPetHealthInfo/:petId',authController.protectUserRoute,petHealthController.getPetHealthInfo);
petHealthRouter.patch('/user/updatePetHealthInfo/:petId',authController.protectUserRoute,petHealthController.updatePetHealthInfo);
petHealthRouter.delete('/user/deletePetHealthInfo/:petId',authController.protectUserRoute,petHealthController.removePetHealthInfo)

export default petHealthRouter;