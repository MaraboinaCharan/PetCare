import mongoose, { Schema } from "mongoose";
import petProfile from "./petProfile.js";

const petHealthSchema=new mongoose.Schema({
    pet:{
        type:Schema.Types.ObjectId,
        ref:petProfile,
        required:true
    },
    weight:{
        type:Number,
        default:null
    },
    height:{
        type:String,
      default:null
    },
    temperature:{
        type:Number,
        default:null
    },
    heartRate:{
        type:Number,
        default:null
    },
    bloodPressure:{
        type:Number,
        default:null
    },
    medications:[{
        medicationName:String,
        dosage:String,
        frequency:String
    }],
    vaccinations:[{
        vaccinationName:String,
        dateOfVaccination:Date,
        nextVaccinationDate:Date
    }],
    illness:[{
        illnessName:String,
      treatment:String,
      status:{type:Boolean,default:false}
    }],
    surgeries:[{
        surgeryName:String,
        surgeryDate:Date,
        veterinarian:String,
        description:String
    }],
    symptoms:{
        type:[String],
        default:[]
    },
    additionalMedicalHealthDescription:String

})
const petHealth=mongoose.model('petHealth',petHealthSchema);

export default petHealth;