const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/user");
const List = require("../models/list");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        let newList,
          user = await User.findOne({ googleId: profile.id });
        if (user) return cb(null, user);
        user = await User.create({
          name: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value,
          photo: profile.photos[0].value,
          role: "member",
        });
        if (!user.readingList) {
          newList = await List.create({
            name: user.name,
            photo: user.photo ? user.photo : `https://placehold.co/100x100`,
            user: user.id,
            personal: true,
          });
          user.readingList = newList.id;
          await user.save();
        }
        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(async function (userId, cb) {
  cb(null, await User.findById(userId));
});
