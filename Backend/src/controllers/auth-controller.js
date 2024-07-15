import jwt from 'jsonwebtoken';
import util from 'util';
import crypto from 'crypto';
import sendEmail from '../utils/email.js';
import dotenv from 'dotenv';
import petDoctor from '../models/petDoctor.js';
import { createSendResponse, sendResponse ,getModelName,getSecretStringandExpiresIn} from '../utils/utils.js';
import user from '../models/user.js';

dotenv.config({path:"./config.env"});


const signUp=async (req,res,next)=>{
    try{
      const Model=getModelName(req.path);
    const {name,email,contactNumber,address,gender,password,confirmPassword,...rest}=req.body;

 let existingUser=await Model.findOne({email});
 
 if(existingUser)
 {
   return sendResponse(res,400,`Duplicate ${Model.modelName}`,`${Model.modelName} already exists`,null);
   
 }
 const newUser=await Model.create({
    name,email,contactNumber,address,gender,password,confirmPassword,...rest
 });

 const {secret,expiresIn,cookieExpires,cookieName}=getSecretStringandExpiresIn(req.path);

   createSendResponse(newUser,201,res,secret,expiresIn,cookieExpires,cookieName);
}
catch(err){
    sendResponse(res,500,'Error',err.message,null);
}
}


const login=async (req,res,next)=>{
 try{
   const Model=getModelName(req.path);
  const {email,password}=req.body;

  const user=await Model.findOne({email}).select('+password');
  
  const isPasswordCorrect=await user.comparePasswordInDb(password,user.password);

  if(!user||!isPasswordCorrect)
  {
    return sendResponse(res,401,'Error','Invalied email or passowrd',null);
  }
  const {secret,expiresIn,cookieExpires,cookieName}=getSecretStringandExpiresIn(req.path)
  // console.log(req.path,cookieName)
createSendResponse(user,200,res,secret,expiresIn,cookieExpires,cookieName);

 }
 catch(err)
 {
   sendResponse(res,500,'Error',err.message,null);
 }
}

const forgotPassword=async (req,res,next)=>{
   const Model=getModelName(req.path)
 const user=await Model.findOne({email:req.body.email});
 if(!user)
 {
    return sendResponse(res,404,'Failed',`${Model.modelName} doesnot exist with the given email-id`,null)
 }
 const resetToken=await user.createResetPasswordToken();
 await user.save({validateBeforeSave:false});
 const resetUrl=`${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
 const emailMessage=`You have recieved a password reset email click here to reset password ${resetUrl}`;
 try{
    await sendEmail({
        email:user.email,
        subject:'Reset Password for PetCare Account',
        message:emailMessage
    })
    const {cookieName}=getSecretStringandExpiresIn(req.path)

   sendResponse(res,200,'Success',`Password reset link sent to the ${Model.modelName}`,null);
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
      const Model=getModelName(req.path);
 const token=crypto.createHash('sha256').update(req.params.token).digest('hex');
 const user=await Model.findOne({passwordResetToken:token,passwordResetTokenExpires:{$gt:Date.now()}})
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

 const {secret,expiresIn,cookieExpires,cookieName}=getSecretStringandExpiresIn(req.path)
createSendResponse(user,200,res,secret,expiresIn,cookieExpires,cookieName);
}
catch(err)
{
   sendResponse(res,500,'Error',err.message,null);
}
}


 const logoutUser=async (req,res,next)=>{
   const {cookieName}=getSecretStringandExpiresIn(req.path)
 res.clearCookie(cookieName,{
    httpOnly:true,
    sameSite:'None',
    secure:true
 });
 return sendResponse(res,200,'Success','Logged out ')
}

const protectUserRoute = async (req, res, next) => {
    try {
        const secret = process.env.SECRET_STR;
        const cookieName = 'userJwt';
        const Model=user;
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies && req.cookies[cookieName]) {
            token = req.cookies[cookieName];
        } else {
            return sendResponse(res, 401, 'Failed', 'Invalid token', null);
        }

        const decodedToken = await util.promisify(jwt.verify)(token, secret); 
        const user2 = await Model.findById(decodedToken.id);
        if (!user2) {
            return sendResponse(res, 404, 'Failed', 'User not found', null);
        }
        const isPasswordChanged = await user2.isPasswordChanged(decodedToken.iat);
        if (isPasswordChanged) {
            return sendResponse(res, 401, 'Failed', 'Password has been changed recently');
        }

        req.user = user2;
        next();
    } catch (error) {
        sendResponse(res, 500, 'Error', 'Internal Server error', null);
    }
};

const protectPetDoctorRoute = async (req, res, next) => {
  try {
      const secret = process.env.PET_DOCTOR_SECRET_STR;
      const cookieName = 'petDoctorJwt';
      let token;
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
          token = req.headers.authorization.split(' ')[1];
      } else if (req.cookies && req.cookies[cookieName]) {
          token = req.cookies[cookieName];
      } else {
          return sendResponse(res, 401, 'Failed', 'Invalid token', null);
      }

      const decodedToken = await util.promisify(jwt.verify)(token, secret);
      const petDoctor2 = await petDoctor.findById(decodedToken.id);
      if (!petDoctor2) {
          return sendResponse(res, 404, 'Failed', 'Pet Doctor not found', null);
      }

      const isPasswordChanged = await petDoctor2.isPasswordChanged(decodedToken.iat);
      if (isPasswordChanged) {
          return sendResponse(res, 401, 'Failed', 'Password has been changed recently');
      }

      req.user = petDoctor2;
      next();
  } catch (error) {
      sendResponse(res, 500, 'Error', 'Internal Server error', null);
  }
};

const authController={
     createSendResponse,signUp,login,forgotPassword,resetPassword,logoutUser,protectUserRoute,protectPetDoctorRoute
}
export default authController;