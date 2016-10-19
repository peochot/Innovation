const nodemailer = require('nodemailer');

//&sort=&mekuti=false&hakusanakentta=sanahaku&hakusana=&alueet=Uusima&ilmoitettuPvm=3 2/24h 3/4 paiva 4/vikko
const MailService = function() {
    var smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: '',
            pass: ''
        }
    };
    var transporter = nodemailer.createTransport(smtpConfig);

    var sendActivationEmail = function(user,callback) {
        var mailOptions = {
            to: user.email, // list of receivers
            subject: 'Please activate your account', // Subject line
            //text: 'Nay la sao', // plaintext body
            html: '<b>Please activate your account by following </b><a href="https://young-sierra-68180.herokuapp.com/api/activate?token='+user.activate_token+'"> this link</a>' // html body
        };
        transporter.sendMail(mailOptions, callback);
    }

    return {
        sendActivationEmail: sendActivationEmail,
    }
}();



module.exports=MailService;
