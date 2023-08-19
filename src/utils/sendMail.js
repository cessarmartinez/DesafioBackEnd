const nodemailer = require("nodemailer");
require("dotenv").config();

const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

exports.sendMail = async (destino, subject, html) => {
    return await transport.sendMail({
        from: "Prueba",
        to: destino,
        subject,
        html,
    });
};
