const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { setOtp, getOtp, deleteOtp } = require('../stores/otpStore');
const { sendOtpEmail } = require('../utils/mailer');

const OTP_LENGTH = 4;

const genOtp = (len = OTP_LENGTH) => {
  let otp = '';
  for (let i = 0; i < len; i++) otp += Math.floor(Math.random() * 10);
  return otp;
};

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({ name, email, passwordHash });
    await user.save();

    return res.json({ message: 'User created' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const otp = genOtp();
    const ttl = Number(process.env.OTP_EXPIRE_SECONDS || 300);
    setOtp(user._id.toString(), otp, ttl);

    await sendOtpEmail(email, "Your OTP Code", `Your OTP is: ${otp}`);


    return res.json({ message: 'OTP sent', userId: user._id.toString() });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/verify-otp', async (req, res) => {
  try {
    const { userId, otp } = req.body;
    if (!userId || !otp) return res.status(400).json({ message: 'Missing fields' });

    const stored = getOtp(userId);
    if (!stored) return res.status(400).json({ message: 'OTP expired or not found' });

    if (stored !== String(otp)) return res.status(400).json({ message: 'Invalid OTP' });

    deleteOtp(userId);

    const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'jwt_secret', {
      expiresIn: '2h'
    });

    return res.json({ message: 'Verified', token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
