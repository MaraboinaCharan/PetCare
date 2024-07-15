import mongoose, { Schema } from "mongoose";
import petProfileMiddleware from "../middlewares/petProfile-middleware.js";
import petHealth from "./PetHealth.js";
import user from "./user.js";

const petProfileSchema=new mongoose.Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    petName:{
        type:String,
        required:[true,'Please Enter pet name']
    },
    age:{
        type:Number,
        required:[true,'Please Enter age']
    },
    breed:{
        type:String,
        required:[true,'Please Enter Breed']
    },
    petProfileCreatedAt:{
        type:Date,
        default:Date.now()
    },
    medicalHistory:{
        type: Schema.Types.ObjectId,
        ref:'petHealth'
    },
    petProfilePicture:{
        url:String
    },
    petPhotos:[{
        url:String
    }]

})

petProfileSchema.pre('findOneAndDelete',petProfileMiddleware.deleteMedicalHistory);

const petProfile=mongoose.model('petProfile',petProfileSchema);

export default petProfile;