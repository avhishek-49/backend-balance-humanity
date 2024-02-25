"use strict";
let nodemailer = require("nodemailer");
// let setValues = require("./redis_helper_new");

const host = process.env.SMTPHOST;
const port = process.env.SMTPPORT;
const service = process.env.SMTPSERVICE;
(sendingMail => {
sendingMail.send = async message => {
    const transporter = nodemailer.createTransport({
        host: "mail.myserver.com",
        port: 587,
        secure: false,
        service: "gmail",
        auth: {
            user:"balancehumanity49@gmail.com",
            pass: "mdgh lnzk hxpd htsw",
        },
    });
    await transporter.sendMail({
        to: message.email, //receiver email
        subject: message.subject, // Subject line
        text: message.details.message + ` ${message.details.value} `, // value is OTP
    });

    if (message.type == "OTP") {
        return {
            status: true,
            OTP: message.details.value,
        };
    }

    return {
        status: false,
        value: "UnsuccessFul",
    };
};
})(module.exports);

/*
// to be passed message format

const message = {
    subject : `OTP verification Message`,
    details : {
        message: `This is an OTP to verify your transaction`,
        //const OTP=Math.floor(Math.random() * (9999 - 1111) + 1111) //generates 4 digits random key
        value: OTP 
    },
    email: email,
    type:'OTP'
    }




*/
