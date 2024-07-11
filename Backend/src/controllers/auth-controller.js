import jwt from 'jsonwebtoken';
import util from 'util';
import crypto from 'crypto';
import User from '../models/user.js';
import sendEmail from '../utils/email.js';
import dotenv from 'dotenv';

dotenv.config({path:"./config.env"});

const signToken=(id)=>{
    return jwt.sign({id},process.env.SECRET_STR,{
        expiresIn:process.env.LOGIN_EXPIRES
    })
    
}

export const createSendResponse=(user,statusCode,res)=>{

    const token=signToken(user._id);

    const options={
        maxAge:process.env.COOKIE_EXPIRES,
        httpOnly:true
    }
    console.log(options.maxAge)
    options.secure=true;
    res.cookie('jwt',token,options);
    user.password=undefined,
    user.confirmPassword=undefined;


    res.status(statusCode).json({
       "status":"success",
       token,
       "data":{
        user
       }
    })
}


const signUp=async (req,res,next)=>{
    try{
    const {name,email,contactNumber,address,gender,password,confirmPassword}=req.body;

 let existingUser=await User.findOne({email});
 
 if(existingUser)
 {
   return res.status(400).json({
        "status":"Duplicate User",
        message:"User Already exists"
    })
   
 }
 const newUser=await User.create({
    name,email,contactNumber,address,gender,password,confirmPassword
 });
 console.log(newUser)
   createSendResponse(newUser,201,res);
}
catch(err){
    res.status(500).json({
        "status":"Error",
        "msg":err.message
    })
}
}


export const login=async (req,res,next)=>{
 try{
  const {email,password}=req.body;

  const user=await User.findOne({email}).select('+password');
  
  const isPasswordCorrect=await user.comparePasswordInDb(password,user.password);

  if(!user||!isPasswordCorrect)
  {
    return res.status(401).json({
        "status":"Error",
        "message":"Invalid email or password"
    })
  }
createSendResponse(user,200,res);

 }
 catch(err)
 {
    res.status(500).json({
        "status":"Error",
        "message": err.message
    });
 }
}


export const forgotPassword=async (req,res,next)=>{
 const user=await User.findOne({email:req.body.email});
 if(!user)
 {
    return res.status(201).json({
        "status":"Failed",
        "message":"user doesn't exist with the given email-id"
    });
 }
 const resetToken=user.createResetPasswordToken();
 await user.save({validateBeforeSave:false});
 const resetUrl=`${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
 const emailMessage=`You have recieved a password reset email click here to reset password ${resetUrl}`;
 try{
    await sendEmail({
        email:user.email,
        subject:'Reset Password for PetCare Account',
        message:emailMessage
    })
    res.status(201).json({
        "status":"success",
        message:"Password Reset link sent to the user"
    })
 }
 catch(err)
 {
    user.passwordResetToken=undefined,
    user.passwordResetTokenExpires=undefined,
    user.save({validateBeforeSave:false}),
    res.status(201).json({
        "status":"Error",
        "message":err.message
    })
    return next();
 }

}


export const resetPassword=async (req,res,next)=>{
    try{
 const token=crypto.createHash('sha256').update(req.params.token).digest('hex');
 const user=await User.findOne({passwordResetToken:token,passwordResetTokenExpires:{$gt:Date.now()}})
 if(!user)
 {
    return res.status(201).json({
        "status":"Failed",
        "message":"Invalid token || Token Expired"
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
 user.passwordResetToken=undefined,user.passwordResetTokenExpires=undefined;
 user.passwordChangedAt=Date.now();
 await user.save();
 
createSendResponse(user,200,res);
}
catch(err)
{
    next(err);
}
}

export const protectRoute=async (req,res,next)=>{
try{
    const testToken=req.headers.authorization;
    // console.log(testToken);
    let token;
    if(testToken&&testToken.startsWith('Bearer'))
    {
      token=testToken.split(' ')[1];
    }
 
    if(!token)
    {
        return res.status(401).json({message: 'Invalid Token'});
    }
    const decodedToken=await util.promisify(jwt.verify)(token,process.env.SECRET_STR)

    const user=await User.findById(decodedToken.id);
    if(!user)
    {
       return res.status(404).json({message: "The user with the given token doesn't exist"});
    }

 
  const isPasswordChanged=await user.isPasswordChanged(decodedToken.iat);

  if(isPasswordChanged)
   {
    return res.status(401).json({message: 'Password has been changed recently!'});
   }

  req.user=user;
  next();
} catch (error) {
    // console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

}

export default signUp;