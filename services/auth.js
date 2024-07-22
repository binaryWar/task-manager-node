// auth.js
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieSession = require('cookie-session');
const router = express.Router();

const app = express();

// Configure cookie session
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: '598027431043-ufr8mpvkoi25qkt9hnkvq17rvr4b3dhg.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:3000/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
  // You can save user information to your database here
  done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log("hello and the my name is khan ")
    res.redirect('http://localhost:4200');
  }
);

router.get('/logout', (req, res) => {
    
  req.logout();
  res.redirect('http://localhost:4200');
});

module.exports = app;
