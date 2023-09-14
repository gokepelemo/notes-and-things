const express = require('express');
const router = express.Router();
const notesCtrl = require('../controllers/notes')
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/books/:id/notes/new', notesCtrl.new);
router.get('/', notesCtrl.index);
router.post('/', notesCtrl.create);
router.delete('/:id', notesCtrl.delete)
router.get('/:id/edit', notesCtrl.edit);
router.get('/:id', notesCtrl.show);

module.exports = router;