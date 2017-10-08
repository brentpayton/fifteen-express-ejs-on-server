var express               = require('express');
var router                = express.Router({mergeParams: true});
var passport              = require('passport');
var User                  = require('../models/user');

// ----------------------------------------------------------------------------
// reCAPTCHA
// Not certain all of the reCAPTCHA code in this module is needed but taking
// it out will be tedious and it isn't doing any harm.
// ----------------------------------------------------------------------------
var credentials           = require('../credentials.json');
var Recaptcha             = require('../lib/express-recaptcha');
var recaptcha             = new Recaptcha(credentials.reCAPTCHA.site_key, credentials.reCAPTCHA.secret_key);

// ----------------------------------------------------------------------------
// Register
// ----------------------------------------------------------------------------
// router.get('/register', function(req, res) {
//   res.render('register');
// });

router.get('/register', recaptcha.middleware.render, (req, res) => {
    res.render('register', { captcha: res.recaptcha })
});

// router.post('/register', function(req, res) {
//   var newUser = new User({
//       username: req.body.username,
//       email:    req.body.email,
//       administrator: false});
//   User.register(newUser, req.body.password, function(err, user) {
//     if (err) {
//       req.flash('error', err.message);
//       res.redirect('/register');
//     } else {
//       passport.authenticate('local')(req, res, function() {
//         req.flash('success', 'Welcome to FifteenLines!, ' + user.username);
//         res.redirect('/poems');
//       });
//     }
//   });
// });

router.post('/register', recaptcha.middleware.verify, function(req, res) {
  var newUser = new User({
      username: req.body.username,
      email:    req.body.email,
      administrator: false});
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      req.flash('error', err.message);
      res.redirect('/register');
    } else {
      passport.authenticate('local')(req, res, function() {
        req.flash('success', 'Welcome to FifteenLines!, ' + user.username);
        res.redirect('/poems');
      });
    }
  });
});

// ----------------------------------------------------------------------------
// Log in
// ----------------------------------------------------------------------------
router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', passport.authenticate('local',
  {
    successRedirect:'/poems',
    failureRedirect:'/login',
    failureFlash: true
  }), function(req, res) {
});

// ----------------------------------------------------------------------------
// Log out
// ----------------------------------------------------------------------------
router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You have been logged out');
  res.redirect('/poems');
});

module.exports = router;
