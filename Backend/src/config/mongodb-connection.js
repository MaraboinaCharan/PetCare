import mongoose, { connect } from "mongoose";
import dotenv  from 'dotenv';

dotenv.config({path:"./config.env"});

const connectDb=async ()=>{
    try{
        // console.log(process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI,{
        })
        console.log('MongoDb Connected!')
    }
    catch(err){
     console.error('Connection failedd',err.message);
     process.exit(1);
    }
}

export default connectDb;