const express = require('express');
const router = express.Router();
const listsCtrl = require('../controllers/lists')
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, listsCtrl.index);
router.post('/', ensureLoggedIn, listsCtrl.create);
router.get('/new', ensureLoggedIn, listsCtrl.new);
router.delete('/:id', ensureLoggedIn, listsCtrl.delete);
router.get('/:id/edit', ensureLoggedIn, listsCtrl.edit);
router.get('/:id', listsCtrl.show);
router.put('/:id', ensureLoggedIn, listsCtrl.update);

module.exports = router;