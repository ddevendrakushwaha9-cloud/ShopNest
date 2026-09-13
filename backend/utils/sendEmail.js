const nodemailer = require('nodemailer');

const sendEmail = async ({ email, subject, message }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('EMAIL_USER and EMAIL_PASS are required');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const result = await transporter.sendMail({
    from: `"ShopNest Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    text: message,
  });

  console.log(`Email successfully sent to ${email}`);
  return result;
};

module.exports = sendEmail;