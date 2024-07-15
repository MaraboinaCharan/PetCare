import mongoose from "mongoose";
import validator from 'validator';
import userService from '../services/userService.js';
import userMiddleware from '../middlewares/user-middleware.js';

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

// userSchema.pre('save',userMiddleware.hashThePassword);
// userSchema.pre('findOneAndDelete',userMiddleware.deleteUserData);


userSchema.pre('save', async function(next) {
    await userMiddleware.hashThePassword.call(this, next);
});

userSchema.pre('findOneAndDelete', async function(next) {
    await userMiddleware.deleteUserData.call(this, next);
});

const user=mongoose.model('user',userSchema);

export default user;