const express = require('express');
const router = express.Router();
const notesCtrl = require('../controllers/notes');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// custom routes to show notes for specific lists, books, and users
router.get('/users/:userId/notes', ensureLoggedIn, notesCtrl.index);
router.get('/lists/:listId/notes', notesCtrl.index);

// custom route to show a specific note on a book
router.get('/books/:bookId/notes/:noteId', ensureLoggedIn, notesCtrl.show);

router.get('/books/:id/notes/new', ensureLoggedIn, notesCtrl.new);
router.get('/notes', ensureLoggedIn, notesCtrl.index);
router.post('/notes', ensureLoggedIn, notesCtrl.create);
router.delete('/notes/:id', ensureLoggedIn, notesCtrl.delete);
router.put('/notes/:id', ensureLoggedIn, notesCtrl.update)
router.get('/notes/:id/edit', ensureLoggedIn, notesCtrl.edit);

module.exports = router;