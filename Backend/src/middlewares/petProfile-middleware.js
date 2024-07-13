import petHealth from "../models/PetHealth.js";


   const deleteMedicalHistory=async function(next){
        const petId=this.getQuery()['_id'];
        try {
            const pet=await this.model.findById(petId);
            if (pet&&pet.medicalHistory) {
                await petHealth.findByIdAndDelete(pet.medicalHistory);
            }
            next();
        } catch (err) {
            next(err);
        }
    }

    const petProfileMiddleware={
        deleteMedicalHistory
    }

export default petProfileMiddleware;