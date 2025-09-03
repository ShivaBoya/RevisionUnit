const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    displayName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'User'], default: 'User' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
