const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  // configure  email service here
    host: process.env.EMAIL_AUTH_HOST,
    port: process.env.EMAIL_AUTH_PORT,
    auth: {
      user: process.env.EMAIL_AUTH_USER,
      pass: process.env.EMAIL_AUTH_PASS
    }
});


async function sendEmail({ to, subject, text }) {
  const mailOptions = {
    from: '"PorkerHut Service" <ehoneah@learninbits.com>', 
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email: ' + error);
  }
}

module.exports = {
  sendEmail,
};
