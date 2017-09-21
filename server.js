// ----------------------------------------------------------------------------
// Express
// ----------------------------------------------------------------------------
var express               = require('express');
var passport              = require('passport');
var Strategy              = require('passport-facebook').Strategy;
var fs                    = require('fs');
var spdy                  = require('spdy');
var app                   = express();
                            app.set('view engine', 'ejs');
                            app.use(express.static(__dirname + '/public'));
var moment                = require('moment');
var promise               = require('bluebird');
const port                = 3010;

// ----------------------------------------------------------------------------
// SPDY
// ----------------------------------------------------------------------------
var options = {
    key: fs.readFileSync('/etc/letsencrypt/live/www1.brentpayton.com/privkey.pem'),
    cert:  fs.readFileSync('/etc/letsencrypt/live/www1.brentpayton.com/fullchain.pem')
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

// ----------------------------------------------------------------------------
// Mongoose
// ----------------------------------------------------------------------------
var mongoose              = require('mongoose');
                          // mongoose.connect('mongodb://localhost/yelpcamp'); //Dev
                          mongoose.connect('mongodb://mongodb://fifteenlines:password@ds147034.mlab.com:47034/fifteenlines_dev');
mongoose.Promise          = Promise;

//------------------------------------------------------------------------------
// Facebook
//------------------------------------------------------------------------------

// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy({
    clientID: process.env.CLIENT_ID || 1957965834451520,
    clientSecret: process.env.CLIENT_SECRET || '64306eb0e0e97ae10b4445d0d986d890',
    callbackURL: 'https://dev.fifteenlines.com/login/facebook/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Define routes.
app.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });

app.get('/login',
  function(req, res){
    res.render('login');
  });

app.get('/login/facebook',
  passport.authenticate('facebook'));

app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

// app.listen(port);
