var express               = require('express');
var router                = express.Router({mergeParams: true});
var passport              = require('passport');


router.get('/',
  function(req, res) {
    res.render('facebook/home', { user: req.user });
  });

router.get('/login',
  function(req, res){
    res.render('facebook/fblogin');
  });

router.get('/login/facebook',
  passport.authenticate('facebook'));

router.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('facebook/profile', { user: req.user });
  });
