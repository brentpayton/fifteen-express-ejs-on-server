  var express               = require('express');
var router                = express.Router();
var Poem                  = require('../models/poem');

// ----------------------------------------------------------------------------
// Homepage route
// ----------------------------------------------------------------------------
// router.get('/', function(req, res) {
//   res.render('landing');
// });

// ----------------------------------------------------------------------------
// Show all poems
// ----------------------------------------------------------------------------
// router.get('/', function(req, res) {
//   Poem.find({}, function(err, allPoems){
//     if (err) {
//       console.log(err);
//     } else {
//       res.render('poems/index', {poems: allPoems});
//     }
//   });
// });

router.get('/', function(req, res) {
  Poem.find()
    .skip(0)
    .limit(5)
    .exec(function(err, allPoems) {
    if (err) {
      console.log(err);
    } else {
      res.render('poems/index', {poems: allPoems});
    }
  });
});


router.get('/howToPlay', function(req, res) {
  Poem.find({}, function(err, allPoems){
    if (err) {
      console.log(err);
    } else {
      res.render('howtoplay');
    }
  });
});
module.exports = router;
