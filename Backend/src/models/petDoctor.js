import mongoose from "mongoose";
import validator from "validator";
import userMiddleware from "../middlewares/user-middleware.js";
import userService from "../services/userService.js";

const petDoctorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter petDoctor name']
    },
    email:{
        type:String,
        required:[true,'Please enter ur email-id'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please Enter vlaid E-mail']
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

    contactNumber:{
        type:String,
        required:[true,'Please Enter Contact Number'],
        unique:true,
        validate:[validator.isMobilePhone,'Please Enter Contact Number']
       },
       clinicName:{
        type:String,
        required:[true,'Please eneter clinic name']
       },
       clinicAddress:{
        street:{
            type:String,
            required:[true,'Please enter street']
        },
        city:{
            type:String,
            required:[true,'Please enter city']
        },
        state:{
            type:String,
            required:[true,'Please enter city']
        },
     pincode:{
        type:Number,
        required:[true,'please eneter pincode']
     }

       },
       specialization:{
        type:String,
        required:[true,'Please enter specialisation']
       },
       profilePicture:{
        url:String
       },
       gender:{
        type:String,
        required:[true,'Please enter your gender']
       },
       experience:{
        type:String
       }

    
})

petDoctorSchema.methods.comparePasswordInDb=userService.comparePasswordInDb;
petDoctorSchema.methods.isPasswordChanged=userService.isPasswordChanged;
petDoctorSchema.methods.createResetPasswordToken=userService.createResetPasswordToken;
petDoctorSchema.pre('save',userMiddleware.hashThePassword);
petDoctorSchema.pre('findOneAndDelete',userMiddleware.deleteUserData);

const petDoctor=mongoose.model('petDoctor',petDoctorSchema);

export default petDoctor;