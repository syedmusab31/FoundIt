import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({ 
    host:'smtp.gmail.com',
    port:process.env.SMTP_PORT || 587,
    auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})
export default transporter;