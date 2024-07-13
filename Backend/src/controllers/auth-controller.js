import jwt from 'jsonwebtoken';
import util from 'util';
import crypto from 'crypto';
import User from '../models/user.js';
import sendEmail from '../utils/email.js';
import dotenv from 'dotenv';
import { createSendResponse, sendResponse } from '../utils/utils.js';

dotenv.config({path:"./config.env"});



const signUp=async (req,res,next)=>{
    try{
    const {name,email,contactNumber,address,gender,password,confirmPassword}=req.body;

 let existingUser=await User.findOne({email});
 
 if(existingUser)
 {
   return sendResponse(res,400,'Duplicate User','User already exists',null);
   
 }
 const newUser=await User.create({
    name,email,contactNumber,address,gender,password,confirmPassword
 });

   createSendResponse(newUser,201,res);
}
catch(err){
    sendResponse(res,500,'Error',err.message,null);
}
}


const login=async (req,res,next)=>{
 try{
  const {email,password}=req.body;

  const user=await User.findOne({email}).select('+password');
  
  const isPasswordCorrect=await user.comparePasswordInDb(password,user.password);

  if(!user||!isPasswordCorrect)
  {
    return sendResponse(res,401,'Error','Invalied email or passowrd',null);
  }
createSendResponse(user,200,res);


 }
 catch(err)
 {
   sendResponse(res,500,'Error',err.message,null);
 }
}


const forgotPassword=async (req,res,next)=>{
 const user=await User.findOne({email:req.body.email});
 if(!user)
 {
    return sendResponse(res,404,'Failed','User doesnot exist with the given email-id',null)
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
   sendResponse(res,200,'Success','Password reset link sent to the user',null);
 }
 catch(err)
 {
    user.passwordResetToken=undefined,
    user.passwordResetTokenExpires=undefined,
    user.save({validateBeforeSave:false}),
    sendResponse(res,500,'Error',err.message,null);
  
 }

}


const resetPassword=async (req,res,next)=>{
    try{
 const token=crypto.createHash('sha256').update(req.params.token).digest('hex');
 const user=await User.findOne({passwordResetToken:token,passwordResetTokenExpires:{$gt:Date.now()}})
 if(!user)
 {
    return sendResponse(res,400,'Failed','Invalid token or token expired',null);
 }

if(req.body.password!==req.body.confirmPassword)
{
  return sendResponse(res,400,'Failed','Passwords didnot match',null);

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
   sendResponse(res,500,'Error',err.message,null);
}
}




 const logoutUser=async (req,res,next)=>{
 res.clearCookie('jwt',{
    httpOnly:true,
    sameSite:'None'
 });
 return sendResponse(res,200,'Success','Logged out ')
}



const protectRoute=async (req,res,next)=>{
try{
   
 let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies && req.cookies.jwt) {
            token = req.cookies.jwt;
            
        }
    if(!token)
    {
        return sendResponse(res,401,'Failed','Invalid token',null);
    }
    const decodedToken=await util.promisify(jwt.verify)(token,process.env.SECRET_STR)

    const user=await User.findById(decodedToken.id);
    if(!user)
    {
       return sendResponse(res,404,'Failed','The user with the given token doesnot exist',null);
    }

 
  const isPasswordChanged=await user.isPasswordChanged(decodedToken.iat);

  if(isPasswordChanged)
   {
    return sendResponse(res,401,'Failed','Password has been changed recently');
   }

  req.user=user;
  next();
} catch (error) {
    sendResponse(res,500,'Error','Internal Server error',null);
  }

}


const authController={
     createSendResponse,signUp,login,forgotPassword,resetPassword,logoutUser,protectRoute
}
export default authController;