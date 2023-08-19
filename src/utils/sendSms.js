require("dotenv").config();
const twilio = require("twilio");

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendSms = () =>
        client.messages
        .create({
            body: 'prueba',
            from: '+18146288348',
            to: '+543364395087'
        })

/*exports.sendWhatsapp = () =>
    client.messages
    .create({
        body: 'Prueba',
        from: `whatsapp:+18146288348`,
        to: `whatsapp:+543364395087`
    })*/