import jwt from 'jsonwebtoken';
import util from 'util';
import User from '../models/user-model.js';

const signToken=(id)=>{
    return jwt.sign({id},process.env.SECRET_STR,{
        expiresIn:process.env.LOGIN_EXPIRES
    })
    
}
const signUp=async (req,res,next)=>{
    try{
    const {name,email,contactNumber,address,gender,password,confirmPassword}=req.body;

 const newUser=await User.create({
    name,email,contactNumber,address,gender,password,confirmPassword
 });


 let existingUser=User.findOne({email});
 
 if(existingUser)
 {
    res.status(400).json({
        "status":"Duplicate User",
        message:"User Already exists"
    })
 }

const token=signToken(newUser._id);

 res.status(201).json({
    "status":"success",
    token,
    "data":{user:newUser}
 })
 
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

  const token=signToken(user._id);
  res.status(200).json({
    "status":"success",
    token
  });

 }
 catch(err)
 {
    res.status(500).json({
        "status":"Error",
        "message": err.message
    });
 }
}
export const protectRoute=async (req,res,next)=>{
try{
    const testToken=req.headers.authorization;
    let token;
    if(testToken&&testToken.startsWith('bearer'))
    {
      token=testToken.split(' ')[1];
    }
    if(!token)
    {
        return res.status(401).json({message: 'Invalid Token'});
    }
    const decodedToken=await util.promisify(jwt.verify)(token,process.env.SECRET_STR)

    const user=User.findById(decodedToken.id);
    if(!user)
    {
       return res.status(404).json({message: "The user with the given token doesn't exist"});
    }
   
  const isPasswordChanged=await user.isPasswordChanged(decodedToken.iat);
  if(isPasswordChanged)
   {
    return res.status(401).json({message: 'Password has been changed!'});
   }
  req.user=user;
  next();
} catch (error) {
    // console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

}

export default signUp;