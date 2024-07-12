import User from '../models/user.js';
import { createSendResponse } from './auth-controller.js';


const filterObj=(obj,...allowedFields)=>{
    const newObj={};
    Object.keys(obj).forEach(key=>{
      if (allowedFields.includes(key)) {
        newObj[key]=obj[key];
      }
    });
    return newObj;
  };


export const updatePassword=async(req,res,next)=>{
    try{
    const user=await User.findById(req.user._id).select('+password');
    if(!await user.comparePasswordInDb(req.body.currentPassword,user.password)){
        return res.status(201).json({
            "status":"Failed",
            "message":"The Current Password you provided is wrong!"
        })
    }
if(req.body.password!==req.body.confirmPassword)
{
  return res.status(401).json({
       "status":"Failed",
       "message":"Password & confirmPassword didn't match"
   })

}
user.password=req.body.password,
user.confirmPassword=req.body.confirmPassword;
await user.save();
createSendResponse(user,201,res);
}
catch(err)
{
    next(err);
}

}

export const updateUserData=async (req,res,next)=>{
    try{
    if(req.body.password||req.body.confirmPassword)
    {
        return res.status(401).json({
            "status":"Failed",
            "message":"Can't Update password here,got to password change Section"
        })
    }

    const allowedFields=['name','email','contactNumber','address','gender','profilePicture','emergencyContact'];
    const filteredBody=filterObj(req.body, ...allowedFields);
   const user=await  User.findByIdAndUpdate(req.user.id,req.body,{new:true,runValidators:true});
   if (!user) {
    return res.status(404).json({
      status: "Failed",
      message: "User not found with the data you entered!"
    });
  }
    createSendResponse(user,201,res);
}
catch(err)
{
    next(err);
}
}

export const deleteUser=async(req,res,next)=>{
    try{
    await User.findByIdAndDelete(req.user.id)
   return  res.status(204).json({
    "Status":"success",
    "data":null
    })
}
catch(err)
{
    next(err);
}
}