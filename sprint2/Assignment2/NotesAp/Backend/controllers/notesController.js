const Note = require('../models/Note');
const User = require('../models/User');

exports.createNote = async (req, res) => {
  try {
    const { title, description = '' } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required.' });

    const note = await Note.create({ title, description, owner: req.user._id });
    res.json(note);
  } catch (err) {
    console.error('Create note error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found.' });

    const isOwner = note.owner.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'Admin';
    if (!isOwner && !isAdmin) return res.status(403).json({ message: 'Not allowed to edit.' });

    const { title, description } = req.body;
    if (title !== undefined) note.title = title;
    if (description !== undefined) note.description = description;

    await note.save();
    res.json(note);
  } catch (err) {
    console.error('Update note error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found.' });

    const isOwner = note.owner.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'Admin';
    if (!isOwner && !isAdmin) return res.status(403).json({ message: 'Not allowed to delete.' });

    await note.deleteOne();
    res.json({ message: 'Note deleted.' });
  } catch (err) {
    console.error('Delete note error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getMyNotes = async (req, res) => {
  try {
    const q = req.query.q || '';
    const notes = await Note.find({
      owner: req.user._id,
      title: { $regex: q, $options: 'i' }
    }).sort({ updatedAt: -1 });

    res.json(notes);
  } catch (err) {
    console.error('Get my notes error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getSharedWithMe = async (req, res) => {
  try {
    const q = req.query.q || '';
    const notes = await Note.find({
      sharedWith: req.user._id,
      title: { $regex: q, $options: 'i' }
    })
      .populate('owner', 'displayName email')
      .sort({ updatedAt: -1 });

    res.json(notes);
  } catch (err) {
    console.error('Get shared notes error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.shareNote = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Recipient email is required.' });

    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found.' });

    const isOwner = note.owner.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'Admin';
    if (!isOwner && !isAdmin) return res.status(403).json({ message: 'Not allowed to share.' });

    const recipient = await User.findOne({ email });
    if (!recipient) return res.status(404).json({ message: 'User to share with not found.' });

    const already = note.sharedWith.some((id) => id.toString() === recipient._id.toString());
    if (already) return res.status(400).json({ message: 'Already shared with this user.' });

    note.sharedWith.push(recipient._id);
    await note.save();

    res.json(note);
  } catch (err) {
    console.error('Share note error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate('owner', 'displayName email');
    if (!note) return res.status(404).json({ message: 'Note not found.' });

    const isOwner = note.owner._id.toString() === req.user._id.toString();
    const isShared = note.sharedWith.map(String).includes(req.user._id.toString());
    const isAdmin = req.user.role === 'Admin';

    if (!isOwner && !isShared && !isAdmin) {
      return res.status(403).json({ message: 'Not allowed to view.' });
    }

    res.json(note);
  } catch (err) {
    console.error('Get note by id error:', err.message);
    res.status(500).send('Server error');
  }
};
