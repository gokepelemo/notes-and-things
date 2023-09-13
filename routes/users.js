const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users')
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/profile/:id', usersCtrl.show);
router.get('/', usersCtrl.index);
router.get('/new', usersCtrl.new);
router.get('/:id/edit', usersCtrl.edit);

module.exports = router;
