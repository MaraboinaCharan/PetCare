import express from 'express';
import { protectRoute } from '../controllers/auth-controller.js';
import { addPet, getAllPetsInfo, getPetInfo, removePet, updatePetInfo } from '../controllers/petProfile-controller.js';
const petProfileRouter=express.Router();

petProfileRouter.post('/',protectRoute,addPet);
petProfileRouter.get('/allPets',protectRoute,getAllPetsInfo);
petProfileRouter.get('/pet/:id',protectRoute,getPetInfo);
petProfileRouter.patch('/updatePetInfo/:id',protectRoute,updatePetInfo);
petProfileRouter.delete('/pet/:id',protectRoute,removePet)

export default petProfileRouter;