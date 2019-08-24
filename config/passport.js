var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var Band = require("../models/band");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK
    },
    function(accessToken, refreshToken, profile, cb) {
      Band.findOne({ googleId: profile.id }, function(err, student) {
        if (err) return cb(err);
        if (band) {
          return cb(null, band);
        } else {
          // we have a new band via OAuth!
          var newBand = new Band({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id
          });
          newBand.save(function(err) {
            if (err) return cb(err);
            return cb(null, newBand);
          });
        }
      });
    }
  )
);

passport.serializeUser(function(band, done) {
  done(null, student.id);
});

passport.deserializeUser(function(id, done) {
  Band.findById(id, function(err, band) {
    done(err, student);
  });
});