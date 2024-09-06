const nodemailer = require('nodemailer');
const AppError = require('./appError');

require('dotenv').config();

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: title,
      text: body,
    });
    return info;
  } catch (err) {
    console.log(err.message);
    throw new AppError('Failed to send email', 500);
  }
};

module.exports = mailSender;
