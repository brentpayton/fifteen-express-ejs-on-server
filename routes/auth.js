/* jshint esversion: 6 */

var express               = require('express');
var router                = express.Router({mergeParams: true});
var passport              = require('passport');
var User                  = require('../models/user');
var csrf                  = require('csurf');
var csrfProtection        = csrf({ cookie: true });
// var parseForm             = bodyParser.urlencoded({ extended: false });
var bodyParser            = require('body-parser');
// ----------------------------------------------------------------------------
// reCAPTCHA
// ----------------------------------------------------------------------------
var credentials           = require('../credentials.json');
var Recaptcha             = require('../lib/express-recaptcha');
var recaptcha             = new Recaptcha(credentials.reCAPTCHA.site_key, credentials.reCAPTCHA.secret_key);

// ----------------------------------------------------------------------------
// Register
// ----------------------------------------------------------------------------
router.get('/register', recaptcha.middleware.render, (req, res) => {
    res.render('register', { captcha: res.recaptcha });
});

router.post('/register', recaptcha.middleware.verify, function(req, res) {
  var newUser = new User({
      username:       req.body.username,
      email:          req.body.email,
      provider:       'local',
      admin:          false});

  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      req.flash('error', err.message);
      res.redirect('/register');
    } else {
      passport.authenticate('local')(req, res, function() {
        req.flash('success', 'Welcome to Fifteenlines, ' + user.username + '!');
        res.redirect('/poems');
      });
    }
  });
});

// ----------------------------------------------------------------------------
// Register with no captcha for testing purposes
// ----------------------------------------------------------------------------
router.get('/register_no_captcha', recaptcha.middleware.render, (req, res) => {
    res.render('register_no_captcha', { captcha: res.recaptcha });
});

// ----------------------------------------------------------------------------
// Log in
// ----------------------------------------------------------------------------
// router.get('/login', function(req, res) {
//  res.render('login');
// });

router.get('/login', csrfProtection, function(req, res) {
  res.render('send', { csrfToken: req.csrfToken() });
});

// router.post('/login', passport.authenticate('local',
//   {
//     successRedirect:'/poems',
//     failureRedirect:'/login',
//     failureFlash: true
//   }), function(req, res) {
// });

router.post('/login', bodyParser, csrfProtection, passport.authenticate('local',
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
