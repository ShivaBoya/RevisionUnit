// utils/mailer.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOtpEmail(to, otp) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
    });
    console.log("✅ OTP email sent to", to);
  } catch (err) {
    console.error("❌ Mail sending error:", err);
    throw err;
  }
}

module.exports = { sendOtpEmail };
