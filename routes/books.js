const express = require('express');
const router = express.Router();
const booksCtrl = require('../controllers/books');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/books/', booksCtrl.index);
router.post('/books/', ensureLoggedIn, booksCtrl.create);
router.get('/books/new', ensureLoggedIn, booksCtrl.new);
router.get('/books/new/search/:query', ensureLoggedIn, booksCtrl.search);
router.get('/books/:id', booksCtrl.show);
router.put('/books/:id', ensureLoggedIn, booksCtrl.update)
router.get('/books/:id/edit', ensureLoggedIn, booksCtrl.edit);
router.delete('/books/:id', ensureLoggedIn, booksCtrl.delete);

module.exports = router;