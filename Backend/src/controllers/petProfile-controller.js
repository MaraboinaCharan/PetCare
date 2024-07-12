import mongoose from 'mongoose';
import petHealth from '../models/PetHealth.js';
import petProfile from '../models/petProfile.js';

export const sendResponse=(res,statusCode,statusMsg,msg,data)=>{
   return res.status(statusCode).json({
        "status":statusMsg,
        "message":msg,
        data
    })
}

export const addPet=async (req,res,next)=>{
try{
const {petName,age,breed,medicalHistory,petPhotos,petProfilePicture}=req.body;
const owner=req.user._id;
console.log(req.body);
let existingPet=await petProfile.findOne({petName,owner});
 
 if(existingPet)
 {
    let msg='Duplicate Pet';
    let statusMsg='Failed';
    sendResponse(res,400,statusMsg,msg,null);
   
 }

const newPet=new petProfile({owner,petName,age,breed,medicalHistory,petPhotos,petProfilePicture});
const newPetHealth=new petHealth({
    pet:newPet._id,
    ...medicalHistory
});
await newPetHealth.save();
newPet.medicalHistory=newPetHealth._id;
await newPet.save();
let msg='Pet added into db successully';
let statusMsg='Success';
sendResponse(res,201,statusMsg,msg,newPet,null);

}
catch(err)
{
  next(err);
}
}

export const getAllPetsInfo=async (req,res,next)=>{
    
    try{
        const owner=req.user._id;
const pets=await petProfile.find({owner}).populate('owner');
if(!pets||pets.length==0)
{
    let statusMsg='Failed';
   let msg='There are no pets in db'
sendResponse(res,404,statusMsg,msg,null);
}
let statusMsg='Success';
let msg='Pets retrieved successfully!';
sendResponse(res,200,statusMsg,msg,pets);
    }
    catch(err)
    {
        next(err);
    }
}
export const getPetInfo=async (req,res,next)=>{
    try{
        const petId = req.params.id;
    
        if (!mongoose.Types.ObjectId.isValid(petId)) {
           sendResponse(res, 400, 'Failed', 'Invalid Pet ID', null);
        }

    const pet=await petProfile.findOne({_id:req.params.id}).populate('owner');
    if(!pet)
    {
      let statusMsg='Failed',msg='No pet in db with the given id';
      return sendResponse(res,404,statusMsg,msg,null);
    }
    let statusMsg='Success',
    msg='Pet retrieved succesfully!'
    return sendResponse(res,200,statusMsg,msg,pet);
}
catch(err)
{
    next(err);
}
    
}


export const updatePetInfo=async (req, res, next) => {
    try {
        const petId=req.params.id;
        const {medicalHistory, ...petData }=req.body;
        if (!mongoose.Types.ObjectId.isValid(petId)) {
            return sendResponse(res,400,'Failed','Invalid Pet ID',null);
        }

        const pet=await petProfile.findById(petId);

        if (!pet) {
            return sendResponse(res,404,'Failed','Invalid Pet ID',null);
        }
        const updatedPet=await petProfile.findByIdAndUpdate(petId,petData,{new:true,runValidators:true});

        if (medicalHistory) {
            await petHealth.findByIdAndUpdate(pet.medicalHistory,medicalHistory,{new:true,runValidators:true});
        }

        const populatedPet=await petProfile.findById(petId).populate('medicalHistory').populate('owner');

        return sendResponse(res,200,'Success','Updated Pet Data',populatedPet);

    } catch (err) {
        next(err);
    }
}


export const removePet=async (req,res,next)=>{
    try{
        const petId=req.params.id;
        if (!mongoose.Types.ObjectId.isValid(petId)) {
            return sendResponse(res,400,'Failed','Invalid Pet ID',null);
        }

 const removePet=await petProfile.findByIdAndDelete({_id:req.params.id});  
 if(!removePet)
 {
    let statusMsg='Failed',msg='Invalid Pet ID';
    sendResponse(res,404,statusMsg,msg,null);

 }
 let statusMsg='Success',msg='Pet removed successfuly!';
 sendResponse(res,200,statusMsg,msg,removePet); 
}
catch(err)
{
    next(err);
}

}