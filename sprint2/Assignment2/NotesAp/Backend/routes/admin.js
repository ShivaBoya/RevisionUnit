const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const User = require('../models/User');
const Note = require('../models/Note');

router.use(auth, roles('Admin'));

router.get('/users', async (_req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
});

router.get('/notes', async (_req, res) => {
  const notes = await Note.find()
    .populate('owner', 'displayName email')
    .sort({ updatedAt: -1 });
  res.json(notes);
});

module.exports = router;
