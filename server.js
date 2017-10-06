// ----------------------------------------------------------------------------
// Express
// ----------------------------------------------------------------------------
var express               = require('express');

var user                  = require('./models/user');
var passport              = require('passport');
var Strategy              = require('passport-facebook').Strategy;
var fs                    = require('fs');
var spdy                  = require('spdy');
var app                   = express();
                            app.set('view engine', 'ejs');
                            app.use(express.static(__dirname + '/public'));
var bodyParser            = require('body-parser');
var credentials           = require('./credentials.json');
var passport              = require('passport'),
    // TwitterStrategy       = require('passport-twitter').Strategy,
    FacebookStrategy      = require('passport-facebook').Strategy;
//
var expressSession        = require('express-session');
                            app.use(expressSession({
                              secret              : credentials.expressSession,
                              resave              : false,
                              saveUninitialized   : false
                            }));
var moment                = require('moment');
var promise               = require('bluebird');
var port                  = 3010;

// ----------------------------------------------------------------------------
// Mongoose
// ----------------------------------------------------------------------------
var mongo = require('./mongoDev.js');  // Excluded from source control.
// var mongo = requi  re('./mongoProd.js');  // Excluded from source control.

// ----------------------------------------------------------------------------
// Models
// ----------------------------------------------------------------------------
var Comment               = require('./models/comment.js');
var User                  = require('./models/user.js');
var Poem                  = require('./models/poem.js');

// ----------------------------------------------------------------------------
// Facebook Auth
// ----------------------------------------------------------------------------
passport.use(new FacebookStrategy({
    clientID: credentials.facebook.app_id,
    clientSecret: credentials.facebook.app_secret,
    callbackURL: credentials.facebook.callback,
    profileFields:['id','displayName','emails']
    }, function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        var me = new user({
            email:profile.emails[0].value,
            name:profile.displayName
        });

        /* save if new */
        user.findOne({email:me.email}, function(err, u) {
            if(!u) {
                me.save(function(err, me) {
                    if(err) return done(err);
                    done(null,me);
                });
            } else {
                console.log(u);
                done(null, u);
            }
        });
  }
));

// ----------------------------------------------------------------------------
// User serialize/deserialize
// ----------------------------------------------------------------------------
passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    user.findById(id, function(err, user) {
        done(err, user);
    });
});

// ----------------------------------------------------------------------------
// Local Auth
// ----------------------------------------------------------------------------
var LocalStrategy         = require('passport-local');
var passport              = require('passport');
                            app.use(passport.initialize());
                            app.use(passport.session());
                            passport.serializeUser(User.serializeUser());
                            passport.deserializeUser(User.deserializeUser());
                            passport.use(new LocalStrategy(User.authenticate()));
// var bodyParser            = require('body-parser');
//                             app.use(bodyParser.urlencoded({extended: true}));

// ----------------------------------------------------------------------------
// EJS
// ----------------------------------------------------------------------------
// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// ----------------------------------------------------------------------------
// Method Override
// ----------------------------------------------------------------------------
var methodOverride        = require('method-override');
                            app.use(methodOverride('_method'));

// ----------------------------------------------------------------------------
// Connect-Flash
// ----------------------------------------------------------------------------
var flash                 = require('connect-flash');
                            app.use(flash());

// ----------------------------------------------------------------------------
// Make 'currentUser' and 'message' available to every route
// ----------------------------------------------------------------------------
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

// ----------------------------------------------------------------------------
// Middleware
// ----------------------------------------------------------------------------
// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: credentials.expressSession, resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// ----------------------------------------------------------------------------
// Routes
// ----------------------------------------------------------------------------
var poemRoutes              = require('./routes/poems.js');
                            // All poem routes start with '/poems'
                            app.use('/poems', poemRoutes);

// TODO:  Decide whether to keep comments or not.
// They will have to be re-implemented if they're kept.

// var commentRoutes         = require('./routes/comments.js');
                            // All comment routes start with 'campgrounds/:id/comments'
                            // app.use('/campgrounds/:id/comments', commentRoutes);

var authRoutes            = require('./routes/auth.js');
                            app.use(authRoutes);

var indexRoutes           = require('./routes/index.js');
                            app.use(indexRoutes);

var userRoutes            = require('./routes/users.js');
                            app.use(userRoutes);

// ----------------------------------------------------------------------------
// Facebook Routes
// ----------------------------------------------------------------------------
app.get('/facebook',
  function(req, res) {
    res.render('facebook/home', { user: req.user });
  });

app.get('/login/facebook',
  passport.authenticate('facebook'));

app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/facebook/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('facebook/profile', { user: req.user });
  });

// ----------------------------------------------------------------------------
// SPDY
// ----------------------------------------------------------------------------
var options = {
    key: fs.readFileSync(credentials.spdy.key),
    cert:  fs.readFileSync(credentials.spdy.cert)
};

spdy
  .createServer(options, app)
  .listen(port, (error) => {
    if (error) {
      console.error(error);
      return process.exit(1);
    } else {
      console.log('Listening on port: ' + port + '.');
    }
  });
