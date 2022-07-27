const nodeMailer = require("nodemailer")

const sendEmail = async (options) =>{

    console.log(options)
    
    const transporter = nodeMailer.createTransport({
        host:"smtp.gmail.com",
        port:405,
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
        pass:process.env.SMPT_PASSWORD,
        },
        
        tls: {
            rejectUnauthorized: false
        }
        
    })

    const mailOptions = {
        form:process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message
    }

    await transporter.sendMail(mailOptions)

}

module.exports = sendEmail