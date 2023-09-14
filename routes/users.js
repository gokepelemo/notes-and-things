const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users')
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/profile/:id', usersCtrl.show);
router.put('/users/:id', usersCtrl.update);
router.get('/users/:id/edit', usersCtrl.edit);
router.get('/users/new', usersCtrl.new);

module.exports = router;
