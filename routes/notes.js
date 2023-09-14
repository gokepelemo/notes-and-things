const express = require('express');
const router = express.Router();
const notesCtrl = require('../controllers/notes')
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/books/:id/notes/new', notesCtrl.new);
router.get('/books/:bookId/notes/:noteId', notesCtrl.show);
router.get('/notes', notesCtrl.index);
router.post('/notes', ensureLoggedIn, notesCtrl.create);
router.delete('/notes/:id', ensureLoggedIn, notesCtrl.delete);
router.put('/notes/:id', ensureLoggedIn, notesCtrl.update)
router.get('/notes/:id/edit', notesCtrl.edit);

module.exports = router;