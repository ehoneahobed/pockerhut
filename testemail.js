const nodemailer = require('nodemailer');
require('dotenv').config();

// for mailtrap
// let transport = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: process.env.MAILTRAP_USERID,
//       pass: process.env.MAILTRAP_USERPASSWORD
//     }
//   });




const transport = nodemailer.createTransport({
    // configure  email service here
      host: process.env.EMAIL_AUTH_HOST,
      port: process.env.EMAIL_AUTH_PORT,
      auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASS
      }
  });
  

let emailOptions = {
    from: '"PorkerHut Service" <ehoneah@learninbits.com>',
    to: 'obedehoneah@gmail.com',
    subject: 'Password Reset',
    text: "This is a sample email that I am sending you."
  };

transport.sendMail(emailOptions, (err, info) => {
    if (err) {
        console.error(err);
    }
    else {
        console.log(info);
    }
})