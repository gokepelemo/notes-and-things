const express = require('express');
const router = express.Router();
const booksCtrl = require('../controllers/books');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', booksCtrl.index);
router.post('/', ensureLoggedIn, booksCtrl.create);
router.get('/new', ensureLoggedIn, booksCtrl.new);
router.get('/:id', booksCtrl.show);
router.put('/:id', ensureLoggedIn, booksCtrl.update)
router.get('/:id/edit', booksCtrl.edit);
router.delete('/:id', ensureLoggedIn, booksCtrl.delete);

module.exports = router;