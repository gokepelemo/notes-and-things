const express = require('express');
const router = express.Router();
const passport = require('passport');

const siteCtrl = require('../controllers/site')

router.get('/auth/google', passport.authenticate(
    'google',
    {
        scope: ['profile', 'email'],
    }
));
router.get('/oauth2callback', passport.authenticate(
    'google',
    {
        successRedirect: '/',
        failureRedirect: '/',
    }
));
router.get('/logout', function(req, res){
    req.logout(function() {
      res.redirect('/');
    });
  });
router.get('/', siteCtrl.home);

module.exports = router;
