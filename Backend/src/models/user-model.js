import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Enter your name']
    },
    email:{
        type:String,
        required:[true,'Please Enter your E-mail'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please Enter vlaid E-mail']
    },
    contactNumber:{
     type:String,
     required:[true,'Please Enter Contact Number'],
     unique:true,
     validate:[validator.isMobilePhone,'Please Enter Contact Number']
    },
    address:{
        type:String,
        required:[true,'Please Enter Address']
    },
    gender:{
        type:String,
        required:[true,'Please Select Your Gender'],
    },
    password:{
        type:String,
        required:[true,'Please Enter Password'],
        minlength:8
    },
    confirmPassword:{
        type:String,
        required:[true,'Please Enter Confirm Password'],
        minlength:8,
        validate: {
            validator: function(pass) {
                return  pass===this.password;
            },
            "message":'Passwords are Different'
    }
    },
    profilePicture:{
         type:String
    },
    emergencyContact:{
       name: {type:String},
        relationship:{type:String},
        contactNumber:{type:String}
    },
    passwordChangedAt:Date


})
userSchema.pre('save',async function(next){

    if(!this.isModified('password'))
    {
        return next();
    }

    try{
 const hashedPassword=await bcrypt.hash(this.password,12);
 this.password=hashedPassword
    this.confirmPassword=undefined;
    next();
    }
    catch(err)
    {
        next(err);
    }
})
userSchema.methods.comparePasswordInDb=async function(pass,passDb)
{
 return await bcrypt.compare(pass,passDb);
 
}
userSchema.methods.isPasswordChanged=async function(JWTTimestamp)
{
    if(this.passwordChangedAt)
    {
        const passwordChangeTimestamp=parseInt(this.passwordChangedAt.getTime()/1000,10);
        return JWTTimestamp<passwordChangeTimestamp;
    }
    return false;

}

const user=mongoose.model('User',userSchema);

export default user;