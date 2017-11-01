var express               = require('express');
var router                = express.Router({mergeParams: true});
var Poem                  = require('../models/poem');
var middleware            = require('../middleware');  // Contents of index.js automatically required

// ----------------------------------------------------------------------------
// Show all poems
// ----------------------------------------------------------------------------
router.get('/', function(req, res) {
  Poem.find({}, function(err, allPoems){
    if (err) {
      console.log(err);
    } else {
      res.render('poems/index', {poems: allPoems});
    }
  });
});

// ----------------------------------------------------------------------------
// Show all poems, sort by title
// ----------------------------------------------------------------------------
router.get('/byTitle', function(req, res) {
  Poem.find()
    .collation({locale: "en" })
    .sort('title').exec(function(err, allPoems) {
    if (err) {
      console.log(err);
    } else {
      res.render('poems/index', {poems: allPoems});
    }
  });
});

router.get('/byTitleReverse', function(req, res) {
  Poem.find()
    .collation({locale: "en" })
    .sort('-title').exec(function(err, allPoems) {
    if (err) {
      console.log(err);
    } else {
      res.render('poems/index', {poems: allPoems});
    }
  });
});

router.get('/adminByTitle', middleware.isAdmin, function(req, res) {
  Poem.find()
    .collation({locale: "en" })
    .sort('title').exec(function(err, allPoems) {
    if (err) {
      console.log(err);
    } else {
      res.render('poems/admin', {poems: allPoems});
    }
  });
});

router.get('/adminByTitleReverse', middleware.isAdmin, function(req, res) {
  Poem.find()
    .collation({locale: "en" })
    .sort('-title').exec(function(err, allPoems) {
    if (err) {
      console.log(err);
    } else {
      res.render('poems/admin', {poems: allPoems});
    }
  });
});

// ----------------------------------------------------------------------------
// Show all poems, sort by author
// ----------------------------------------------------------------------------
router.get('/byAuthor', function(req, res) {
  Poem.find()
  .collation({locale: "en" })
  .sort('author').exec(function(err, allPoems){
    if (err) {
      console.log(err);
    } else {
      res.render('poems/index', {poems: allPoems});
    }
  });
});

router.get('/byAuthorReverse', function(req, res) {
  Poem.find()
  .collation({locale: "en" })
  .sort('-author').exec(function(err, allPoems){
    if (err) {
      console.log(err);
    } else {
      res.render('poems/index', {poems: allPoems});
    }
  });
});

router.get('/adminByAuthor', middleware.isAdmin, function(req, res) {
  Poem.find()
  .collation({locale: "en" })
  .sort('author').exec(function(err, allPoems){
    if (err) {
      console.log(err);
    } else {
      res.render('poems/admin', {poems: allPoems});
    }
  });
});

router.get('/adminByAuthorReverse', middleware.isAdmin, function(req, res) {
  Poem.find()
  .collation({locale: "en" })
  .sort('-author').exec(function(err, allPoems){
    if (err) {
      console.log(err);
    } else {
      res.render('poems/admin', {poems: allPoems});
    }
  });
});

// ----------------------------------------------------------------------------
// Show all poems, sort by date
// ----------------------------------------------------------------------------
router.get('/byDate', function(req, res) {
  Poem.find({}).sort('createdAt').exec(function(err, allPoems){
    if (err) {
      console.log(err);
    } else {
      res.render('poems/index', {poems: allPoems});
    }
  });
});

router.get('/byDateReverse', function(req, res) {
  Poem.find({}).sort('-createdAt').exec(function(err, allPoems){
    if (err) {
      console.log(err);
    } else {
      res.render('poems/index', {poems: allPoems});
    }
  });
});

router.get('/adminByDate', middleware.isAdmin, function(req, res) {
  Poem.find({}).sort('createdAt').exec(function(err, allPoems){
    if (err) {
      console.log(err);
    } else {
      res.render('poems/admin', {poems: allPoems});
    }
  });
});

router.get('/adminByDateReverse', middleware.isAdmin, function(req, res) {
  Poem.find({}).sort('-createdAt').exec(function(err, allPoems){
    if (err) {
      console.log(err);
    } else {
      res.render('poems/admin', {poems: allPoems});
    }
  });
});

// ----------------------------------------------------------------------------
// Show all poems, sort by hidden.  Admin interface only.
// ----------------------------------------------------------------------------
router.get('/adminByHidden', middleware.isAdmin, function(req, res) {
  Poem.find({}).sort('hidden').exec(function(err, allPoems){
    if (err) {
      console.log(err);
    } else {
      res.render('poems/admin', {poems: allPoems});
    }
  });
});

router.get('/adminByHiddenReverse', middleware.isAdmin, function(req, res) {
  Poem.find({}).sort('-hidden').exec(function(err, allPoems){
    if (err) {
      console.log(err);
    } else {
      res.render('poems/admin', {poems: allPoems});
    }
  });
});

// ----------------------------------------------------------------------------
// Admin
// ----------------------------------------------------------------------------
router.get('/admin', middleware.isAdmin, function(req, res) {
  Poem.find({}, function(err, allPoems){
    if (err) {
      console.log(err);
    } else {
      res.render('poems/admin', {poems: allPoems});
    }
  });
});

// ----------------------------------------------------------------------------
// Create
// ----------------------------------------------------------------------------
router.get('/new', middleware.isLoggedIn, function(req, res) {
  res.render('poems/new');
});

router.post('/', middleware.isLoggedIn, function(req, res) {
  var title        = req.body.title;
  var wordsPerLine = req.body.wordsPerLine;
  var l1w1         = req.body.l1w1;
  var l1w2         = req.body.l1w2;
  var l1w3         = req.body.l1w3;
  var l1w4         = req.body.l1w4;
  var l1w5         = req.body.l1w5;
  var l1w6         = req.body.l1w6;
  var l1w7         = req.body.l1w7;
  var l1w8         = req.body.l1w8;
  var l1w9         = req.body.l1w9;
  var l1w10        = req.body.l1w10;
  var l1w11        = req.body.l1w11;
  var l1w12        = req.body.l1w12;
  var l1w13        = req.body.l1w13;
  var l1w14        = req.body.l1w14;
  var l1w15        = req.body.l1w15;
  var l2w1         = req.body.l2w1;
  var l2w2         = req.body.l2w2;
  var l2w3         = req.body.l2w3;
  var l2w4         = req.body.l2w4;
  var l2w5         = req.body.l2w5;
  var l2w6         = req.body.l2w6;
  var l2w7         = req.body.l2w7;
  var l2w8         = req.body.l2w8;
  var l2w9         = req.body.l2w9;
  var l2w10        = req.body.l2w10;
  var l2w11        = req.body.l2w11;
  var l2w12        = req.body.l2w12;
  var l2w13        = req.body.l2w13;
  var l2w14        = req.body.l2w14;
  var l2w15        = req.body.l2w15;
  var l3w1         = req.body.l3w1;
  var l3w2         = req.body.l3w2;
  var l3w3         = req.body.l3w3;
  var l3w4         = req.body.l3w4;
  var l3w5         = req.body.l3w5;
  var l3w6         = req.body.l3w6;
  var l3w7         = req.body.l3w7;
  var l3w8         = req.body.l3w8;
  var l3w9         = req.body.l3w9;
  var l3w10        = req.body.l3w10;
  var l3w11        = req.body.l3w11;
  var l3w12        = req.body.l3w12;
  var l3w13        = req.body.l3w13;
  var l3w14        = req.body.l3w14;
  var l3w15        = req.body.l3w15;
  var l4w1         = req.body.l4w1;
  var l4w2         = req.body.l4w2;
  var l4w3         = req.body.l4w3;
  var l4w4         = req.body.l4w4;
  var l4w5         = req.body.l4w5;
  var l4w6         = req.body.l4w6;
  var l4w7         = req.body.l4w7;
  var l4w8         = req.body.l4w8;
  var l4w9         = req.body.l4w9;
  var l4w10        = req.body.l4w10;
  var l4w11        = req.body.l4w11;
  var l4w12        = req.body.l4w12;
  var l4w13        = req.body.l4w13;
  var l4w14        = req.body.l4w14;
  var l4w15        = req.body.l4w15;
  var l5w1         = req.body.l5w1;
  var l5w2         = req.body.l5w2;
  var l5w3         = req.body.l5w3;
  var l5w4         = req.body.l5w4;
  var l5w5         = req.body.l5w5;
  var l5w6         = req.body.l5w6;
  var l5w7         = req.body.l5w7;
  var l5w8         = req.body.l5w8;
  var l5w9         = req.body.l5w9;
  var l5w10        = req.body.l5w10;
  var l5w11        = req.body.l5w11;
  var l5w12        = req.body.l5w12;
  var l5w13        = req.body.l5w13;
  var l5w14        = req.body.l5w14;
  var l5w15        = req.body.l5w15;
  var l6w1         = req.body.l6w1;
  var l6w2         = req.body.l6w2;
  var l6w3         = req.body.l6w3;
  var l6w4         = req.body.l6w4;
  var l6w5         = req.body.l6w5;
  var l6w6         = req.body.l6w6;
  var l6w7         = req.body.l6w7;
  var l6w8         = req.body.l6w8;
  var l6w9         = req.body.l6w9;
  var l6w10        = req.body.l6w10;
  var l6w11        = req.body.l6w11;
  var l6w12        = req.body.l6w12;
  var l6w13        = req.body.l6w13;
  var l6w14        = req.body.l6w14;
  var l6w15        = req.body.l6w15;
  var l7w1         = req.body.l7w1;
  var l7w2         = req.body.l7w2;
  var l7w3         = req.body.l7w3;
  var l7w4         = req.body.l7w4;
  var l7w5         = req.body.l7w5;
  var l7w6         = req.body.l7w6;
  var l7w7         = req.body.l7w7;
  var l7w8         = req.body.l7w8;
  var l7w9         = req.body.l7w9;
  var l7w10        = req.body.l7w10;
  var l7w11        = req.body.l7w11;
  var l7w12        = req.body.l7w12;
  var l7w13        = req.body.l7w13;
  var l7w14        = req.body.l7w14;
  var l7w15        = req.body.l7w15;
  var l8w1         = req.body.l8w1;
  var l8w2         = req.body.l8w2;
  var l8w3         = req.body.l8w3;
  var l8w4         = req.body.l8w4;
  var l8w5         = req.body.l8w5;
  var l8w6         = req.body.l8w6;
  var l8w7         = req.body.l8w7;
  var l8w8         = req.body.l8w8;
  var l8w9         = req.body.l8w9;
  var l8w10        = req.body.l8w10;
  var l8w11        = req.body.l8w11;
  var l8w12        = req.body.l8w12;
  var l8w13        = req.body.l8w13;
  var l8w14        = req.body.l8w14;
  var l8w15        = req.body.l8w15;
  var l9w1         = req.body.l9w1;
  var l9w2         = req.body.l9w2;
  var l9w3         = req.body.l9w3;
  var l9w4         = req.body.l9w4;
  var l9w5         = req.body.l9w5;
  var l9w6         = req.body.l9w6;
  var l9w7         = req.body.l9w7;
  var l9w8         = req.body.l9w8;
  var l9w9         = req.body.l9w9;
  var l9w10        = req.body.l9w10;
  var l9w11        = req.body.l9w11;
  var l9w12        = req.body.l9w12;
  var l9w13        = req.body.l9w13;
  var l9w14        = req.body.l9w14;
  var l9w15        = req.body.l9w15;
  var l10w1         = req.body.l10w1;
  var l10w2         = req.body.l10w2;
  var l10w3         = req.body.l10w3;
  var l10w4         = req.body.l10w4;
  var l10w5         = req.body.l10w5;
  var l10w6         = req.body.l10w6;
  var l10w7         = req.body.l10w7;
  var l10w8         = req.body.l10w8;
  var l10w9         = req.body.l10w9;
  var l10w10        = req.body.l10w10;
  var l10w11        = req.body.l10w11;
  var l10w12        = req.body.l10w12;
  var l10w13        = req.body.l10w13;
  var l10w14        = req.body.l10w14;
  var l10w15        = req.body.l10w15;
  var l11w1         = req.body.l11w1;
  var l11w2         = req.body.l11w2;
  var l11w3         = req.body.l11w3;
  var l11w4         = req.body.l11w4;
  var l11w5         = req.body.l11w5;
  var l11w6         = req.body.l11w6;
  var l11w7         = req.body.l11w7;
  var l11w8         = req.body.l11w8;
  var l11w9         = req.body.l11w9;
  var l11w10        = req.body.l11w10;
  var l11w11        = req.body.l11w11;
  var l11w12        = req.body.l11w12;
  var l11w13        = req.body.l11w13;
  var l11w14        = req.body.l11w14;
  var l11w15        = req.body.l11w15;
  var l12w1         = req.body.l12w1;
  var l12w2         = req.body.l12w2;
  var l12w3         = req.body.l12w3;
  var l12w4         = req.body.l12w4;
  var l12w5         = req.body.l12w5;
  var l12w6         = req.body.l12w6;
  var l12w7         = req.body.l12w7;
  var l12w8         = req.body.l12w8;
  var l12w9         = req.body.l12w9;
  var l12w10        = req.body.l12w10;
  var l12w11        = req.body.l12w11;
  var l12w12        = req.body.l12w12;
  var l12w13        = req.body.l12w13;
  var l12w14        = req.body.l12w14;
  var l12w15        = req.body.l12w15;
  var l13w1         = req.body.l13w1;
  var l13w2         = req.body.l13w2;
  var l13w3         = req.body.l13w3;
  var l13w4         = req.body.l13w4;
  var l13w5         = req.body.l13w5;
  var l13w6         = req.body.l13w6;
  var l13w7         = req.body.l13w7;
  var l13w8         = req.body.l13w8;
  var l13w9         = req.body.l13w9;
  var l13w10        = req.body.l13w10;
  var l13w11        = req.body.l13w11;
  var l13w12        = req.body.l13w12;
  var l13w13        = req.body.l13w13;
  var l13w14        = req.body.l13w14;
  var l13w15        = req.body.l13w15;
  var l14w1         = req.body.l14w1;
  var l14w2         = req.body.l14w2;
  var l14w3         = req.body.l14w3;
  var l14w4         = req.body.l14w4;
  var l14w5         = req.body.l14w5;
  var l14w6         = req.body.l14w6;
  var l14w7         = req.body.l14w7;
  var l14w8         = req.body.l14w8;
  var l14w9         = req.body.l14w9;
  var l14w10        = req.body.l14w10;
  var l14w11        = req.body.l14w11;
  var l14w12        = req.body.l14w12;
  var l14w13        = req.body.l14w13;
  var l14w14        = req.body.l14w14;
  var l14w15        = req.body.l14w15;
  var l15w1         = req.body.l15w1;
  var l15w2         = req.body.l15w2;
  var l15w3         = req.body.l15w3;
  var l15w4         = req.body.l15w4;
  var l15w5         = req.body.l15w5;
  var l15w6         = req.body.l15w6;
  var l15w7         = req.body.l15w7;
  var l15w8         = req.body.l15w8;
  var l15w9         = req.body.l15w9;
  var l15w10        = req.body.l15w10;
  var l15w11        = req.body.l15w11;
  var l15w12        = req.body.l15w12;
  var l15w13        = req.body.l15w13;
  var l15w14        = req.body.l15w14;
  var l15w15        = req.body.l15w15;

  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newPoem = {
    title:        title,
    wordsPerLine: wordsPerLine,
    l1w1:         l1w1,
    l1w2:         l1w2,
    l1w3:         l1w3,
    l1w4:         l1w4,
    l1w5:         l1w5,
    l1w6:         l1w6,
    l1w7:         l1w7,
    l1w8:         l1w8,
    l1w9:         l1w9,
    l1w10:        l1w10,
    l1w11:        l1w11,
    l1w12:        l1w12,
    l1w13:        l1w13,
    l1w14:        l1w14,
    l1w15:        l1w15,
    author:       author};
  Poem.create(newPoem, function(err, createdPoem) {
    if (err) {
      console.log(err);
    } else {
      req.flash('success', 'Poem added');
      res.redirect('/poems');
    }
  });
});

// ----------------------------------------------------------------------------
// Show details about one poem
//
// MUST NOT BE MOVED any higher in this file otherwise a request to /new, for
// example, will cause 'new' to be interpreted as a campground id and this will
// generate fatal errors.
// ----------------------------------------------------------------------------
router.get('/:id', function(req, res) {
  // Find poem with provided id
  Poem.findById(req.params.id).exec(function(err, foundPoem) {
    if(err) {
      console.log(err);
    } else {
      // Render the 'show' template with info retrieved from the DB
      res.render('poems/show', {poem: foundPoem});
    }
  });
});

// ----------------------------------------------------------------------------
// Update / Edit
// ----------------------------------------------------------------------------
router.get('/:id/edit', function(req, res) {
  Poem.findById(req.params.id, function(err, foundPoem) {
    if (err) {
      console.log(err);
      req.flash('error', err);
    }
    res.render('poems/edit', {poem: foundPoem});
  });
});

// router.get('/:id/:line/edit', function(req, res) {
//   if (req.params.line == 1) {
//     fields = 'title wordsPerLine l1w1 l1w2 l1w3 l1w4 l1w5 l2w1';
//   }
// });

router.get('/:id/:lineBeingEdited/edit', function(req, res) {
  // Find poem with provided id
  Poem.findById(req.params.id).exec(function(err, foundPoem) {
    if(err) {
      console.log(err);
    } else {
      // Render the 'edit' template with info retrieved from the DB
      res.render('poems/edit', {poem: foundPoem});
    }
  });
});

router.put('/:id', function (req, res){
  Poem.findByIdAndUpdate(
    req.params.id,
    req.body.poem,
    function(err, updatedPoem) {
    if (err) {
      console.log(err);
      res.redirect('/poems');
    } else {
      req.flash('success', 'Poem updated');
      res.redirect('/poems/' + req.params.id);
    }
  });
});

// ----------------------------------------------------------------------------
// Delete
// ----------------------------------------------------------------------------
router.delete('/:id', middleware.isAdmin, function (req, res) {
  Poem.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.log(err);
      res.redirect('/poems');
    } else {
      req.flash('success', 'Poem deleted');
      res.redirect('/poems/admin');
    }
  });
});

//------------------------------------------------------------------------------
// Export
//------------------------------------------------------------------------------
module.exports = router;
