import mongoose, { Schema } from "mongoose";
import petHealth from "./PetHealth.js";
import User from "./user.js";

const petProfileSchema=new mongoose.Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User'
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
const petProfile=mongoose.model('petProfile',petProfileSchema);

export default petProfile;