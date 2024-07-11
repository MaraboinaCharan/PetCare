import mongoose from "mongoose";
import petHealthSchema from "./PetHealth";

const petProfileSchema=new mongoose.Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    petName:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    breed:{
        type:String,
        required:true
    },
    petProfileCreatedAt:{
        type:Date,
        default:Date.now()
    },
    medicalHistory:petHealthSchema,
    petProfilePicture:{
        url:String
    },
    petPhotos:[{
        url:String
    }]

})
const petProfile=mongoose.model('petProfile',petProfileSchema);

export default petProfile;