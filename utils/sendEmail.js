
const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
             user: 'stephensamuelkeys@gmail.com',
             pass: 'xgmb wgqp bdxf juyi'
            },
        });

        await transporter.sendMail({
            from: '"Stephen Jebakumar" <stephensamuelkeys@gmail.com>',
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;
