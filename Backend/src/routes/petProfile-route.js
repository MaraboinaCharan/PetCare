import express from 'express';
import authController from '../controllers/auth-controller.js';
import petProfileController from '../controllers/petProfile-controller.js';

const petProfileRouter=express.Router();

petProfileRouter.post('/',authController.protectRoute,petProfileController.addPet);
petProfileRouter.get('/allPets',authController.protectRoute,petProfileController.getAllPetsInfo);
petProfileRouter.get('/pet/:id',authController.protectRoute,petProfileController.getPetInfo);
petProfileRouter.patch('/updatePetInfo/:id',authController.protectRoute,petProfileController.updatePetInfo);
petProfileRouter.delete('/pet/:id',authController.protectRoute,petProfileController.removePet)

export default petProfileRouter;