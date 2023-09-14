module.exports = function (req, res, next) {
    if(req.isAuthenticated()) return next();
    res.redirect(`/auth/google?redirect=${req.originalUrl}`);
}