const express = require('express');
const router = express.Router();
const votesCtrl = require('../controllers/votes')
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.post('/books/:bookId/votes', ensureLoggedIn, votesCtrl.create);
router.post('/notes/:noteId/votes', ensureLoggedIn, votesCtrl.create);
router.delete('/votes/:id', ensureLoggedIn, votesCtrl.delete);

module.exports = router;