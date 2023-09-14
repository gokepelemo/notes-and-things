const express = require('express');
const router = express.Router();
const listsCtrl = require('../controllers/lists')
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', listsCtrl.index);
router.post('/', listsCtrl.create);
router.get('/new', listsCtrl.new);
router.delete('/:id', listsCtrl.delete);
router.get('/:id/edit', listsCtrl.edit);
router.get('/:id', listsCtrl.show);

module.exports = router;