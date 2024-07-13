import petHealth from '../models/PetHealth.js';
import petProfile from '../models/petProfile.js';
import { findPetByIdAndOwner, sendResponse, validateObjectId } from '../utils/utils.js';


 const addPet=async (req,res,next)=>{
try{
const {petName,age,breed,medicalHistory,petPhotos,petProfilePicture}=req.body;
const owner=req.user._id;
console.log(req.body);
let existingPet=await petProfile.findOne({petName,owner});
 
 if(existingPet)
 {
    sendResponse(res,400,'Failed','Duplicate Pet',null);
   
 }

const newPet=new petProfile({owner,petName,age,breed,medicalHistory,petPhotos,petProfilePicture});
const newPetHealth=new petHealth({
    pet:newPet._id,
    ...medicalHistory
});
await newPetHealth.save();
newPet.medicalHistory=newPetHealth._id;
await newPet.save();
sendResponse(res,201,'Sucess','Pet added into db ',newPet,null);

}
catch(err)
{
  next(err);
}
}


const getAllPetsInfo=async (req,res,next)=>{
    
    try{
        const owner=req.user._id;
const pets=await petProfile.find({owner}).populate('owner').populate('medicalHistory');
if(!pets||pets.length==0)
{
sendResponse(res,404,'Failed','There are no pets in db',null);
}
sendResponse(res,200,'Success','Pets retrieved!',pets);
    }
    catch(err)
    {
        next(err);
    }
}



const getPetInfo=async (req,res,next)=>{
    try{
        const petId = req.params.id;
    
        if (!validateObjectId(petId,res)) {
           return;
        }

    const pet=await petProfile.findOne({_id:req.params.id}).populate('owner').populate('medicalHistory');
    if(!pet)
    {
      return sendResponse(res,404,'Failed','No pet in db with given id',null);
    }

    return sendResponse(res,200,'Sucess','Pet retrievd successfully!',pet);
}
catch(err)
{
    next(err);
}
    
}


const updatePetInfo=async (req, res, next) => {
    try {
        const petId=req.params.id;
        const {medicalHistory, ...petData }=req.body;

        const pet=await findPetByIdAndOwner(petId,req.user._id,res);

        if (!pet) {
            return ;
        }
        const updatedPet=await petProfile.findByIdAndUpdate(petId,petData,{new:true,runValidators:true});

        if (medicalHistory) {
            await petHealth.findByIdAndUpdate(pet.medicalHistory,medicalHistory,{new:true,runValidators:true});
        }

        const petWithAllIfno=await petProfile.findById(petId).populate('medicalHistory').populate('owner');

        return sendResponse(res,200,'Success','Updated Pet Data',petWithAllIfno);

    } catch (err) {
        next(err);
    }
}


const removePet=async (req,res,next)=>{
    try{
        const petId=req.params.id;
        if (!validateObjectId(petId,res)) {
            return ;
        }

 const removePet=await petProfile.findByIdAndDelete({_id:req.params.id});  
 if(!removePet)
 {
    sendResponse(res,404,'Failed','Invalid Pet Id',null);

 }
 sendResponse(res,200,'Success','Pet removed succesfully',removePet); 
}
catch(err)
{
    next(err);
}

}

const petProfileController={
removePet,updatePetInfo,getPetInfo,getAllPetsInfo,addPet,sendResponse
}
export default petProfileController;