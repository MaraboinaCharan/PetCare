import express from 'express';
import { protectRoute } from '../controllers/auth-controller.js';
import { addPetHealthInfo,getPetHealthInfo, removePetHealthInfo,updatePetHealthInfo } from '../controllers/petHealth-controller.js';
const petHealthRouter=express.Router();

petHealthRouter.post('/addPetHealthInfo/:petId',protectRoute,addPetHealthInfo);
petHealthRouter.get('/getPetHealthInfo/:petId',protectRoute,getPetHealthInfo);
petHealthRouter.patch('/updatePetHealthInfo/:petId',protectRoute,updatePetHealthInfo);
petHealthRouter.delete('/deletePetHealthInfo/:petTd',protectRoute,removePetHealthInfo)

export default petHealthRouter;