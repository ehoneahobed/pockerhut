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

// Function specific for sending invitation emails
async function sendInvitationEmail({ to, token }) {
  const subject = 'You\'re Invited to Join as an Admin';
  const text = `You have been invited to register as an admin. Please use the following token to complete your registration process: ${token}\n\n` +
               `Use this link to register: ${process.env.FRONTEND_BASE_URL}/admin/registration?token=${encodeURIComponent(token)}`;

  await sendEmail({ to, subject, text });
}

module.exports = {
  sendEmail,
  sendInvitationEmail,
};