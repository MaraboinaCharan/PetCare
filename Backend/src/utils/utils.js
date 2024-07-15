import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import petProfile from '../models/petProfile.js';
import dotenv from 'dotenv';
import petDoctor from '../models/petDoctor.js';
import user from '../models/user.js';
dotenv.config({path:'./config.env'});

const signToken=(id,secret,expiresIn)=>{
    return jwt.sign({id},secret,{
        expiresIn
    })
    
}
export const sendResponse=(res,statusCode,status,message,data) => {
    return res.status(statusCode).json({
        status,
        message,
        data
    });
};

export const createSendResponse=(user,statusCode,res,secret,expiresIn,cookieExpires,cookieName)=>{

    const token=signToken(user._id,secret,expiresIn);
    const options={
        maxAge:cookieExpires,
        httpOnly:true,
        sameSite:'None',
        secure:true,
        path: cookieName === 'userJwt' ? '/user' : '/petDoctor'
    }
    res.cookie(cookieName,token,options);
    user.password=undefined,
    user.confirmPassword=undefined;
    console.log(res.path,cookieName);
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


  export const getModelName=(path)=>{
    return path.startsWith('/petDoctor')?petDoctor:user;
  }
  
  export const getSecretStringandExpiresIn=(path)=>{
    if(path.startsWith('/petDoctor'))
    {
       return {
          secret:process.env.PET_DOCTOR_SECRET_STR,
          expiresIn:process.env.PET_DOCTOR_LOGIN_EXPIRES,
          cookieExpires:parseInt(process.env.PET_DOCTOR_COOKIE_EXPIRES),
          cookieName:'petDoctorJwt'
       }
    }
    
    return {
       secret:process.env.SECRET_STR,
       expiresIn:process.env.LOGIN_EXPIRES,
       cookieExpires:parseInt(process.env.COOKIE_EXPIRES),
       cookieName:'userJwt'
    }

    }
  