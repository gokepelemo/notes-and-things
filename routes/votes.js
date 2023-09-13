const express = require('express');
const router = express.Router();
const votesCtrl = require('../controllers/votes')
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', votesCtrl.index);
router.post('/:id/edit', votesCtrl.create);
router.delete('/:id', votesCtrl.delete);

module.exports = router;