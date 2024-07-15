import petHealth from '../models/PetHealth.js';
import { findPetByIdAndOwner, sendResponse } from '../utils/utils.js';
import petProfileController from './petProfile-controller.js';


const addPetHealthInfo = async (req, res, next) => {
    try {
        const { petId } = req.params, owner = req.user._id;

        const pet = await findPetByIdAndOwner(petId, owner, res);
        if (!pet) return;
        let petHealthInfo=await petHealth.findOne({ pet: pet._id });
        if (petHealthInfo) {
            petHealthInfo = await petHealth.findByIdAndUpdate(petHealthInfo._id,req.body,{
                new:true,
                runValidators:true
            });
            return petProfileController.sendResponse(res,200,'Success','Pet health info updated!',petHealthInfo);
        } else {
        const newPetHealth = new petHealth({
            pet: pet._id,
            ...req.body
        })
        await newPetHealth.save()

        pet.medicalHistory = newPetHealth._id
        await pet.save();
        return petProfileController.sendResponse(res, 201, 'Success', 'Pet health info added!👍', newPetHealth);
    }

    }
    catch (err) {
        next(err);
    }
}

const getPetHealthInfo = async (req, res, next) => {
    try {
        const { petId } = req.params, owner = req.user._id;
        const pet = await findPetByIdAndOwner(petId, owner, res);
        if (!pet) return;
        const petHealthInfo = await petHealth.findById(pet.medicalHistory);
        if (!petHealthInfo) {
            return sendResponse(res,404,'failed','Pet health info not found',null);
        }
        sendResponse(res, 200, 'success', 'retrieved pet health info', petHealthInfo);

    }
    catch (err) {
        next(err)
    }
}

const updatePetHealthInfo = async (req, res, next) => {
    try {
        const { petId } = req.params, owner = req.user._id;
        const pet = await findPetByIdAndOwner(petId, owner, res);
        if (!pet) {
            return;
        }
        const updatePetHealth = await petHealth.findByIdAndUpdate(pet.medicalHistory, req.body, {
            new: true,
            runValidators: true
        });
        sendResponse(res, 200, 'Success', 'Pet health ino updated ', updatePetHealth);
    }
    catch (err) {
        next(err);
    }
}

const removePetHealthInfo = async (req,res,next) => {
    try {
        const  {petId}  = req.params, owner = req.user._id;
        const pet = await findPetByIdAndOwner(petId, owner,res);
        if (!pet) {
            return;
        }
        console.log(pet);
        const removePetHealth = await petHealth.findByIdAndDelete(pet.medicalHistory);
        pet.medicalHistory = null;
        await pet.save();
        sendResponse(res, 200, 'Success', 'Pet health deleted', removePetHealth);
    }
    catch (err) {
        next(err);
    }
}

const petHealthController = {
    removePetHealthInfo, updatePetHealthInfo, getPetHealthInfo, addPetHealthInfo
}
export default petHealthController