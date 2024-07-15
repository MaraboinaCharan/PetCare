import appointment from "../models/appointment.js";
import user from "../models/user.js";
import petDoctor from "../models/petDoctor.js";
import petHealth from "../models/PetHealth.js";
import { createSendResponse, getSecretStringandExpiresIn, sendResponse } from "../utils/utils.js";

const bookAppointment=async(req,res,next)=>{
    try{
        const {petDoctor,pet,appointmentDate,appointmentInformation}=req.body;
        const user=req.user._id;
        const newAppointment=await appointment.create({
            pet,petDoctor,appointmentDate,appointmentInformation,user
        });

       sendResponse(res,201,"success","appoitnment added",newAppointment)
    }
    catch(err){
next(err);
    }
}

const userAppointments=async(req,res,next)=>{
    try{
   const userId=req.user._id;
   const userAppointments=await appointment.find({user:userId}).populate('petDoctor').populate('pet');
   sendResponse(res,200,"success","list of appoitnments",userAppointments)
    }
    catch(err)
    {
        next(err);
    }
}

const petDoctorAppointments=async(req,res,next)=>{
    try{
   const doctorId=req.user._id;
   console.log(doctorId);
   const userAppointments=await appointment.find({petDoctor:doctorId}).populate('user').populate('pet');

   sendResponse(res,200,"success","list of appoitnments",userAppointments);
   
    }
    catch(err)
    {
        next(err);
    }
}

const updateAppointment=async(req,res,next)=>{
    try{
  const appointmentId=req.params.id;
//   console.log(appointmentId)
  const {appointmentDate,appointmentInformation,appointmentStatus}=req.body;

  const findAppointment=await appointment.findById(appointmentId);
  
  if(!findAppointment)
  {
    return sendResponse(res,404,"failed","No appointment with the given id",null)
  }
  const updatedAppointment=await appointment.findByIdAndUpdate(appointmentId,{appointmentDate,appointmentInformation,appointmentStatus},{new:true,runValidators:true});
 
  if(!updateAppointment)
  {
    return sendResponse(res,404,"failed","invalid data to update",null)
  }
      return  sendResponse(res,201,"success","appoitnment updated",updatedAppointment)
  
    }
    catch(err)
    {
        next(err)
    }
}

const deleteAppointment=async(req,res,next)=>{
    try{
  const appoitmentId=req.params.id;
  const findAppointment=await appointment.findById(appoitmentId);
  if(!findAppointment)
  {
    return  sendResponse(res,404,"failed","No appoitnment with the given id",null)
  }
  await appointment.findByIdAndDelete(appoitmentId);
  sendResponse(res,201,"success","appoitnment deleted",null)
    }
    catch(err)
    {
        next(err);
    }
}

const appoitnmentController={
    bookAppointment,userAppointments,petDoctorAppointments,updateAppointment,deleteAppointment
}

export default appoitnmentController;