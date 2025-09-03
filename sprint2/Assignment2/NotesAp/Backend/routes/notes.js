const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createNote,
  updateNote,
  deleteNote,
  getMyNotes,
  getSharedWithMe,
  shareNote,
  getNoteById
} = require('../controllers/notesController');

router.use(auth);

router.post('/', createNote);
router.get('/mine', getMyNotes);
router.get('/shared', getSharedWithMe);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
router.post('/:id/share', shareNote);

module.exports = router;
