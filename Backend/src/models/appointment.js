import mongoose from "mongoose";
import petDoctor from "./petDoctor.js";
import petProfile from "./petProfile.js";
import user from "./user.js";

const appointmentSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    petDoctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'petDoctor',
        required:true
    },
    pet:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'petProfile',
        required:true
    },
    appointmentDate:{
        type:Date,
        required:true
    },
    appointmentStatus:{
        type:String,
        enum:['Scheduled','inProgress','Completed','Cancelled'],
        default:'Scheduled'
    },
    appointmentInformation:{
        type:String
    }
})


const appointment=mongoose.model('appointment',appointmentSchema);

export default appointment;

