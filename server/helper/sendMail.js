// const nodemailer = require('nodemailer')
// const  {SMTP_MAIL,SMTP_PASSWORD} = process.env
// const emailTemplate = require('./emailTemplate');
// const sendMail = async(email,mailSubject, content )=>{
//     try {
//         const transport = nodemailer.createTransport({
//             host: 'smtp.gmail.com',
//             port:587,
//             secure:false, // for deployment to it true
//             requireTLS : true,  // for local running to it true
//             auth : {
//                 user:SMTP_MAIL,
//                 pass: SMTP_PASSWORD
//             }

//         });
        
//         const mailOptions= {
//             from:SMTP_MAIL,
//             to: email,
//             subject: mailSubject,
//             html: content
//         }

//         // let isMailSent = false;
//         transport.sendMail(mailOptions, function(error,info){
//             if(error){

//                 console.log("error",error.message);
//             }
//             else
//             {
//                 console.log('mail is sent successfully', info.response);
//                 // isMailSent = true;
              
//             }
//         })
//         // return isMailSent;



//     }catch(error){
//         console.log(error.message);
//         // return false;
//     }
// }

// module.exports =  sendMail;


const nodemailer = require('nodemailer');
const { SMTP_MAIL, SMTP_PASSWORD } = process.env;
const emailTemplate = require('./emailTemplate');

const sendMail = async (email, mailSubject, token) => {
    try {
        const transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // for deployment set it to true
            requireTLS: true, // for local running set it to true
            auth: {
                user: SMTP_MAIL,
                pass: SMTP_PASSWORD
            }
        });

        const mailOptions = {
            from: SMTP_MAIL,
            to: email,
            subject: mailSubject,
            html: emailTemplate(token)
        };


        transport.sendMail(mailOptions, function (error, info) {
            if (error) {
                
            } else {
             
            }
        });
    } catch (error) {
        // console.log(error.message);
    }
};

module.exports = sendMail;
