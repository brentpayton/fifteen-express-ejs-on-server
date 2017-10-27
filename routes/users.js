var express               = require('express');
var router                = express.Router({mergeParams: true});
var User                  = require('../models/user');
var middleware            = require('../middleware');  // Contents of index.js automatically required

//------------------------------------------------------------------------------
// Admin interface list all users by default sort order
//------------------------------------------------------------------------------
router.get('/users', middleware.isAdmin, function(req, res) {
  User.find({}, function(err, allUsers) {
    if(err) {
      console.log(err);
    } else {
      res.render('users/index', {users: allUsers});
    }
  });
});

//------------------------------------------------------------------------------
// Admin interface list all users by username
//------------------------------------------------------------------------------
router.get('/users/byName', middleware.isAdmin, function(req, res) {
  User.find()
    .collation({locale: "en" })
    .sort('username').exec(function(err, allUsers) {
    if(err) {
      console.log(err);
    } else {
      res.render('users/index', {users: allUsers});
    }
  });
});

router.get('/users/byNameReverse', middleware.isAdmin, function(req, res) {
  User.find({}).sort('-username').exec(function(err, allUsers) {
    if(err) {
      console.log(err);
    } else {
      res.render('users/index', {users: allUsers});
    }
  });
});

//------------------------------------------------------------------------------
// Admin interface list all users by email
//------------------------------------------------------------------------------
router.get('/users/byEmail', middleware.isAdmin, function(req, res) {
  User.find({})
    .collation({locale: "en" })
    .sort('email').exec(function(err, allUsers) {
    if(err) {
      console.log(err);
    } else {
      res.render('users/index', {users: allUsers});
    }
  });
});

router.get('/users/byEmailReverse', middleware.isAdmin, function(req, res) {
  User.find({})
    .collation({locale: "en" })
    .sort('-email').exec(function(err, allUsers) {
    if(err) {
      console.log(err);
    } else {
      res.render('users/index', {users: allUsers});
    }
  });
});

//------------------------------------------------------------------------------
// Admin interface list all users by admin permissions
//------------------------------------------------------------------------------
router.get('/users/byAdmin', middleware.isAdmin, function(req, res) {
  User.find({})
    .collation({locale: "en" })
    .sort('admin').exec(function(err, allUsers) {
    if(err) {
      console.log(err);
    } else {
      res.render('users/index', {users: allUsers});
    }
  });
});

router.get('/users/byAdminReverse', middleware.isAdmin, function(req, res) {
  User.find({})
    .collation({locale: "en" })
    .sort('-admin').exec(function(err, allUsers) {
    if(err) {
      console.log(err);
    } else {
      res.render('users/index', {users: allUsers});
    }
  });
});

// ----------------------------------------------------------------------------
// Update
// ----------------------------------------------------------------------------
router.get('/users/:id/edit', middleware.isAdmin, function(req, res) {
  User.findById(req.params.id, function(err, foundUser) {
    if(err) {
      console.log(err);
    }
    res.render('users/edit', {user: foundUser});
  });
});

router.put('/users/:id', middleware.isAdmin, function (req, res){
  User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser) {
    if (err) {
      console.log(err);
      res.redirect('/users');
    } else {
      req.flash('success', 'User updated');
      // res.redirect('/users/' + req.params.id);
      res.redirect('/users');
      console.log(req.body.user);
    }
  });
});

// ----------------------------------------------------------------------------
// Delete
// ----------------------------------------------------------------------------
router.delete('/users/:id', middleware.isAdmin, function (req, res) {
  User.findByIdAndRemove(req.params.id, function(err) {
    console.log(req.params.id);
    if (err) {
      console.log(err);
      res.redirect('/users');
    } else {
      req.flash('success', 'User deleted');
      res.redirect('/users');
    }
  });
});

//------------------------------------------------------------------------------
// Export
//------------------------------------------------------------------------------
module.exports = router;
