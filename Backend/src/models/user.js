import mongoose from 'mongoose';
import validator from 'validator';
import userMiddleware from '../services/userMiddleware.js';
import userService from '../services/userService.js';

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
         url:String
    },
    emergencyContact:{
       name: {type:String},
        relationship:{type:String},
        contactNumber:{type:String}
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetTokenExpires:Date,
})

userSchema.methods.comparePasswordInDb=userService.comparePasswordInDb;
userSchema.methods.isPasswordChanged=userService.isPasswordChanged;
userSchema.methods.createResetPasswordToken=userService.createResetPasswordToken;
userSchema.pre('save', userMiddleware.hashPassword);

const user=mongoose.model('User',userSchema);

export default user;