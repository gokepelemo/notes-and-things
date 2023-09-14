const express = require("express");
const router = express.Router();
const passport = require("passport");

const siteCtrl = require("../controllers/site");

router.get("/auth/google", function (req, res, next) {
  res.cookie("redirect", req.headers.referer);
  next();
});

router.get("/logout", function (req, res, next) {
  res.cookie("redirect", req.headers.referer);
  next();
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    failureRedirect: `/`,
    failureMessage: true,
  }),
  function (req, res) {
    res.redirect(req.cookies.redirect);
  }
);
router.get("/logout", function (req, res) {
  req.logout(function () {
    res.redirect(req.cookies.redirect);
  });
});
router.get("/", siteCtrl.home);

module.exports = router;
