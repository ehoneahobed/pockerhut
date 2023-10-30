const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // configure  email service here
    host: "mail.learninbits.com",
    port: 465,
    auth: {
      user: "ehoneah@learninbits.com",
      pass: process.env.EMAIL_AUTH_PASS
    }
});


async function sendEmail({ to, subject, text, html }) {
  const mailOptions = {
    from: '"PorkerHut Service" <service@porkethut.com>', 
    to,
    subject,
    text,
    html,
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
