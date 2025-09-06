require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(cors());

// connect DB
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/tfa_demo');

// Routes
app.use('/api/auth', authRoutes);

const jwt = require('jsonwebtoken');
app.get('/api/protected', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret');
    return res.json({ message: 'Protected data', userId: payload.userId });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

const PORT = Number(process.env.PORT || 5000);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
