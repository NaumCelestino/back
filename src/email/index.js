const nodemailer = require("nodemailer");
const STPM_CONFIG = require('../config/smtp');

async function send_email(mail){
  try{
    let transporter = nodemailer.createTransport({
      host: STPM_CONFIG.host,
      port: STPM_CONFIG.port,
      secure: false,
      auth: {
        user: STPM_CONFIG.user,
        pass: STPM_CONFIG.pass, 
      },
      tls: {
          rejectUnauthorized: false
      }
    });
    let mailSent = await transporter.sendMail({
    from: mail.from, 
    to: mail.to, 
    subject: mail.subject, 
    text: mail.text, 
    html: mail.html, 
    });
    console.log(mailSent)
    return mailSent;
    }catch(e){
      console.log(e)    
}}
module.exports = send_email;