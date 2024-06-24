require('dotenv').config()

module.exports = {
    host :"smtp-mail.outlook.com",
    port: 587,
    secure: false,
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
};