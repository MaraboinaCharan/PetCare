import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import petProfile from '../models/petProfile.js';
import dotenv from 'dotenv';
dotenv.config({path:'./config.env'});

const signToken=(id)=>{
    return jwt.sign({id},process.env.SECRET_STR,{
        expiresIn:process.env.LOGIN_EXPIRES
    })
    
}
export const sendResponse=(res,statusCode,status,message,data) => {
    return res.status(statusCode).json({
        status,
        message,
        data
    });
};


export const createSendResponse=(user,statusCode,res)=>{

    const token=signToken(user._id);
    const options={
        maxAge:process.env.COOKIE_EXPIRES,
        httpOnly:true,
        sameSite:'None'
    }
    options.secure=true;
    res.cookie('jwt',token,options);
    user.password=undefined,
    user.confirmPassword=undefined;

    sendResponse(res,statusCode,'success','',{user,token});
}




export const validateObjectId=(id,res) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        sendResponse(res,400,'Failed','Invalid ID',null);
        return false;
    }
    return true;
};


export const findPetByIdAndOwner=async(petId,owner,res) => {
    if (!validateObjectId(petId,res)) return null;

    const pet=await petProfile.findOne({_id: petId,owner});
    if (!pet) {
        sendResponse(res,404,'Failed','Pet not found or not owned by user',null);
        return null;
    }
    return pet;
};

export const filterObj=(obj,...allowedFields)=>{
    const newObj={};
    Object.keys(obj).forEach(key=>{
      if (allowedFields.includes(key)) {
        newObj[key]=obj[key];
      }
    });
    return newObj;
  };

