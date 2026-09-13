const nodemailer = require('nodemailer');

const sendEmail = async ({ email, subject, message }) => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    throw new Error('GMAIL_USER and GMAIL_PASS are required');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const result = await transporter.sendMail({
    from: `"ShopNest Support" <${process.env.GMAIL_USER}>`,
    to: email,
    subject,
    text: message,
  });

  console.log(`Email successfully sent to ${email}`);
  return result;
};

module.exports = sendEmail;