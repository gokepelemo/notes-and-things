const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users')
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/profile/:id', usersCtrl.show);
router.put('/users/:id', ensureLoggedIn, usersCtrl.update);
router.get('/users/:id/edit', ensureLoggedIn, usersCtrl.edit);

module.exports = router;
