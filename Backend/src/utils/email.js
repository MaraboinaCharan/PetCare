import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({path:"./config.env"});


const sendEmail=async(option)=>{
    const transporter=nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        secure:false,
        auth: {
          user:process.env.EMAIL_USER,
          pass:process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized:false
        }
    })    
    const emailOptions={
        from:'PetCare support<support@petcare.com>',
        to:option.email,
        subject:option.subject,
        text:option.message
    }
   
  await  transporter.sendMail(emailOptions);
}

export default sendEmail;