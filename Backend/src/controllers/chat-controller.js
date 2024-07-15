import chat from '../models/chat.js';
import { sendResponse } from '../utils/utils.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path:"./config.env"});

 const createChat=async(req, res,next)=>{
    try{
        const token=req.cookies.userJwt||req.cookies.petDoctorJwt;
        if(!token){
         return sendResponse(res,404,'Failed','Invalid token',null);
        }
        let decoded;
        if(req.cookies.userJwt) {
            decoded=jwt.verify(token,process.env.SECRET_STR);
        } else if(req.cookies.petDoctorJwt){
            decoded=jwt.verify(token, process.env.PET_DOCTOR_SECRET_STR);
        } else{
            return sendResponse(res,404,'Fialed','Invalid token',null);
        }

        const userId=decoded.id;
        const isDoctor=token===req.cookies.petDoctorJwt;
        const otherParticipantId=isDoctor?req.body.userId:req.body.doctorId;


        if (!otherParticipantId){
            return sendResponse(res,404,'Failed','Invalid particpant id',null);
        }

       
        const existingChat=await chat.findOne({
            participants:{ $all:[userId,otherParticipantId]
            }
        });
        if (existingChat){
            return  sendResponse(res,200,'Success','Chat already open',existingChat)
        }
        const newChat=await chat.create({
            participants:[userId,otherParticipantId],
            messages:[]
        });

        return sendResponse(res,200,'Success','craeted chat',newChat)

    }
    catch(err){
       next(err)
    }
};

const sendMessage=async(req,res,next)=>{
    const {chatId,chatContent,images}=req.body;
    const sender=req.user._id;
    const senderType=req.user.role ==='user'?'user':'petDoctor';

    try{
        const ChatData=await chat.findById(chatId);
        if (!ChatData)
        {
            return sendResponse(res,404,'Failed','Invalid chat',null);
        }

        ChatData.messages.push({sender,senderType,chatContent,images,messageSentTime:new Date(),});

        await ChatData.save();
        return sendResponse(res,200,'Success','Message sent',ChatData);
    }
    catch(err)
    {
       next(err)
    }
};

const getChatHistory=async(req,res,next)=>{
    const {chatId}=req.params;

    try
    {
        const chatHistory=await chat.findById(chatId).populate('participants','name email').populate('messages.sender', 'name email');
        if(!chatHistory)
        {
            return sendResponse(res,404,'Failed','Invalid chat',null);
        }

        return sendResponse(res,200,'Success','retrived chat history',chatHistory.messages);
    }
    catch(err)
    {
        next(err)
    }
};

const chatController={
    getChatHistory, sendMessage,createChat
}
export default chatController;