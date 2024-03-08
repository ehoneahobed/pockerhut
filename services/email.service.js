const nodemailer = require("nodemailer");
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");

const transporter = nodemailer.createTransport({
  // configure  email service here
  host: process.env.EMAIL_AUTH_HOST,
  port: process.env.EMAIL_AUTH_PORT,
  auth: {
    user: process.env.EMAIL_AUTH_USER,
    pass: process.env.EMAIL_AUTH_PASS,
  },
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
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: " + error);
  }
}

// Function specific for sending invitation emails
async function sendInvitationEmail({ to, token }) {
  const subject = "You're Invited to Join as an Admin";
  const text =
    `You have been invited to register as an admin. Please use the following token to complete your registration process: ${token}\n\n` +
    `Use this link to register: ${
      process.env.FRONTEND_BASE_URL
    }/admin/registration?token=${encodeURIComponent(token)}`;

  await sendEmail({ to, subject, text });
}

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY, // Ensure your API key is stored in .env
});
// async function sendEmailWithMailerSend({ to, subject, text, html }) {
//   console.log(`${to} ${subject}`);
//   const recipients = [new Recipient("support.team@porkerhut.com", to)]; // Assuming 'to' is the email address

//   let emailParams = new EmailParams();
//   emailParams.setFrom(process.env.EMAIL_FROM_ADDRESS);
//   emailParams.setFromName(process.env.EMAIL_FROM_NAME);
//   emailParams.setRecipients(recipients);
//   emailParams.setSubject(subject);
//   emailParams.setHtml(html); // HTML version of the message
//   emailParams.setText(text); 

//   // const emailParams = new EmailParams()
//   //   .setFrom("info@porkerhut.com")
//   //   .setFromName("PorkerHut")
//   //   .setRecipients(recipients)
//   //   .setSubject(subject)
//   //   .setHtml(html) // HTML version of the message
//   //   .setText(text); // Plain text version of the message
//   console.log(emailParams);
//   try {
//     const response = await mailersend.send(emailParams);
//     console.log("Email sent via MailerSend:", response);
//   } catch (error) {
//     console.error("Error sending email via MailerSend:", error);
//   }
// }


async function sendEmailWithMailerSend({ to, subject, text, html }) {
  console.log(`${to} ${subject}`);
  const recipients = [new Recipient("support.team@porkerhut.com", to)]; // Assuming 'to' is the email address

  // Correctly initialize the EmailParams object
  let emailParams = new EmailParams()
    .setFrom(new Sender(process.env.EMAIL_FROM_ADDRESS, process.env.EMAIL_FROM_NAME))
    .setTo(recipients)
    .setSubject(subject)
    .setHtml(html) // HTML version of the message
    .setText(text); // Plain text version of the message

  console.log(emailParams);
  try {
    // Use the correct method to send the email
    const response = await mailerSend.email.send(emailParams);
    console.log("Email sent via MailerSend:", response);
  } catch (error) {
    console.error("Error sending email via MailerSend:", error);
  }
}


module.exports = {
  sendEmail,
  sendInvitationEmail,
  sendEmailWithMailerSend,
};
