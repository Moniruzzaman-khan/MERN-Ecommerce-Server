var nodemailer = require('nodemailer');

const EmailSend= async (EmailTo, EmailText, EmailSubject) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            type: "OAuth2",
            user: "19monirkhan19@gmail.com",
            clientId: "217454359693-l0bbn3an5efbqq2v140tvtectomlj6ld.apps.googleusercontent.com",
            clientSecret: "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",
            refreshToken: "1//04svkQlVx9vgVCgYIARAAGAQSNwF-L9IrfgLHMmaRIjD7_pTkOYB3OSWnDkYJOE9vRTxxXFXZwLcLpx2nyZ6JbySxA74AFJlxxZ8",
            accessToken: "ya29.a0AXooCgtFe-rRqwVBie6-xYh4af3_U4vzhmf4oDUyH-25B-HUBqIQ8JmxpoQ2BEGL04VkSzinhYKdiCTVuaM_glcYrWGBmttEv9QHpcXt5RSyECDIM1SU_sgcrcPBc_bI2-3-E7-qRAmmqMHdRJ4G3MvMjvKYjo29CSM3aCgYKAf0SARASFQHGX2MisEvFXIZ0jSE9ilMVu_rMLg0171",
            expires: 999999999,
        },
    });


    let mailOptions = {
        from: 'Monir Mart <19monirkhan19@gmail.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };


    return  await transporter.sendMail(mailOptions)

}
module.exports= EmailSend