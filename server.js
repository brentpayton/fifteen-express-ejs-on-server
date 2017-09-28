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
var bodyParser            = require('body-parser');
// For Facebook Login
                            app.use(bodyParser.urlencoded({ extended: false }));
                            app.use(bodyParser.json());
//
var expressSession        = require('express-session');
                            app.use(expressSession({
                              secret              : 'seattle',
                              resave              : false,
                              saveUninitialized   : false
                            }));
var moment                = require('moment');
var promise               = require('bluebird');
const port                = 3010;

// ----------------------------------------------------------------------------
// Facebook Login (Not OAuth)
// ----------------------------------------------------------------------------
const Guid = require('guid');
const Mustache  = require('mustache');
const Request  = require('request');
const Querystring  = require('querystring');
var csrf_guid = Guid.raw();
const account_kit_api_version = 'v1.00';
const app_id = '1957965834451520';
const app_secret = '64306eb0e0e97ae10b4445d0d986d890';
const me_endpoint_base_url = 'https://graph.accountkit.com/v1.0/me';
const token_exchange_base_url = 'https://graph.accountkit.com/v1.0/access_token';

function loadLogin() {
  return fs.readFileSync('public/fblogin.html').toString();
}

app.get('/fblogin', function(request, response){
  var view = {
    appId: app_id,
    csrf: csrf_guid,
    version: account_kit_api_version,
  };

  var html = Mustache.to_html(loadLogin(), view);
  response.send(html);
});

function loadLoginSuccess() {
  return fs.readFileSync('public/login_success.html').toString();
}

app.post('/login_success', function(request, response){

  // CSRF check
  if (request.body.csrf === csrf_guid) {
    var app_access_token = ['AA', app_id, app_secret].join('|');
    var params = {
      grant_type: 'authorization_code',
      code: request.body.code,
      access_token: app_access_token
    };

    // exchange tokens
    var token_exchange_url = token_exchange_base_url + '?' + Querystring.stringify(params);
    Request.get({url: token_exchange_url, json: true}, function(err, resp, respBody) {
      var view = {
        user_access_token: respBody.access_token,
        expires_at: respBody.expires_at,
        user_id: respBody.id,
      };

      // get account details at /me endpoint
      var me_endpoint_url = me_endpoint_base_url + '?access_token=' + respBody.access_token;
      Request.get({url: me_endpoint_url, json:true }, function(err, resp, respBody) {
        // send login_success.html
        if (respBody.phone) {
          view.phone_num = respBody.phone.number;
        } else if (respBody.email) {
          view.email_addr = respBody.email.address;
        }
        var html = Mustache.to_html(loadLoginSuccess(), view);
        response.send(html);
      });
    });
  }
  else {
    // login failed
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end("Something went wrong. :( ");
  }
});

// ----------------------------------------------------------------------------
// Mongoose
// ----------------------------------------------------------------------------
var mongoose              = require('mongoose');
                            mongoose.connect('mongodb://mongodb://fifteenlines:password@ds147034.mlab.com:47034/fifteenlines_dev');
mongoose.Promise          = Promise;

// ----------------------------------------------------------------------------
// Models
// ----------------------------------------------------------------------------
var Comment               = require('./models/comment.js');
var User                  = require('./models/user.js');
var Poem                  = require('./models/poem.js');

//------------------------------------------------------------------------------
// Facebook OAuth
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
    // console.log(profile); // BKP:  Doesn't work.
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
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

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

// TODO:  Decide whether to keep comments or not.  They will have to be re-implemented
// if they're kept.

  var commentRoutes         = require('./routes/comments.js');
                              // All comment routes start with 'campgrounds/:id/comments'
                              app.use('/campgrounds/:id/comments', commentRoutes);

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

  // app.get('/facebook/login',
  //   function(req, res){
  //     res.render('facebook/login');
  //   });

  app.get('/login/facebook',
    passport.authenticate('facebook'));

  app.get('/login/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    });

  app.get('/facebook/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res){
      res.render('facebook/profile', { user: req.user });
    });

// -----------------------------------------------------------------------------

    app.get('/test',
      function(req, res){
        res.render('test');
      });

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
