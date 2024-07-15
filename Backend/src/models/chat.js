import mongoose from "mongoose";
import user from "./user.js";
import petDoctor from "./petDoctor.js";

const messageSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'senderType'
    },
    senderType:{
        type:String,
        required:[true,'SenderType required'],
        enum:['user','petDoctor']
    },
    chatContent:{
        type:String,
        required:[true,'atleast one message needed']
    },
    images:[{
        type:String,
        required:false
    }],
    messageSentTime:{
        type:Date,
        default:Date.now
    },
    messageStatus:{
        type:String,
        enum:['Sent','Read','unRead'],
        default:'Sent'
    }
},
{
    _id:false
}
)

const chatSchema=new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'petDoctor'
    }
    ],
    messages:[messageSchema],
    activeStatus:{
        type:Boolean,
        default:true
    }

})

const chat=mongoose.model('chat',chatSchema);
export default chat;