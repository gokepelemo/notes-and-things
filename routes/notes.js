const express = require('express');
const router = express.Router();
const notesCtrl = require('../controllers/notes');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// custom routes to show notes for specific lists, books, and users
router.get('/users/:userId/notes', ensureLoggedIn, notesCtrl.index);
router.get('/lists/:listId/notes', ensureLoggedIn, notesCtrl.index);

// custom route to show a specific note on a book
router.get('/notes/:id', notesCtrl.show);

router.get('/books/:id/notes/new', ensureLoggedIn, notesCtrl.new);
router.get('/notes', ensureLoggedIn, notesCtrl.index);
router.post('/notes', ensureLoggedIn, notesCtrl.create);
router.delete('/notes/:id', ensureLoggedIn, notesCtrl.delete);

module.exports = router;