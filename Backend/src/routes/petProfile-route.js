import express from 'express';
import authController from '../controllers/auth-controller.js';
import petProfileController from '../controllers/petProfile-controller.js';

const petProfileRouter=express.Router();

petProfileRouter.post('/user/addPet',authController.protectUserRoute,petProfileController.addPet);
petProfileRouter.get('/user/allPets',authController.protectUserRoute,petProfileController.getAllPetsInfo);
petProfileRouter.get('/user/pet/:id',authController.protectUserRoute,petProfileController.getPetInfo);
petProfileRouter.patch('/user/updatePetInfo/:id',authController.protectUserRoute,petProfileController.updatePetInfo);
petProfileRouter.delete('/user/pet/:id',authController.protectUserRoute,petProfileController.removePet)

export default petProfileRouter;