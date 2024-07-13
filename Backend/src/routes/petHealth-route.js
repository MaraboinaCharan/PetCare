import express from 'express';
import authController from '../controllers/auth-controller.js';
import petHealthController from '../controllers/petHealth-controller.js';

const petHealthRouter=express.Router();

petHealthRouter.post('/addPetHealthInfo/:petId',authController.protectRoute,petHealthController.addPetHealthInfo);
petHealthRouter.get('/getPetHealthInfo/:petId',authController.protectRoute,petHealthController.getPetHealthInfo);
petHealthRouter.patch('/updatePetHealthInfo/:petId',authController.protectRoute,petHealthController.updatePetHealthInfo);
petHealthRouter.delete('/deletePetHealthInfo/:petId',authController.protectRoute,petHealthController.removePetHealthInfo)

export default petHealthRouter;