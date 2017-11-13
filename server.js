/* jshint strict: true */
/* jshint esversion: 6 */

// ----------------------------------------------------------------------------
// Express
// ----------------------------------------------------------------------------

// The following ensures smooth operation with 'forever' automation
switch(app.get('env')) {
    case 'development':
        process.chdir('/usr/share/nginx/html/dev.fifteenlines/');
        break;
    case 'production':
        process.chdir('/usr/share/nginx/html/fifteenlines/');
        break;
    default:
        throw new error('Unknown execution environment: ', app.get('env'));
}

var express               = require('express');
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
    FacebookStrategy      = require('passport-facebook').Strategy;
var expressSession        = require('express-session');
                            app.use(expressSession({
                              secret              : credentials.expressSession,
                              resave              : false,
                              saveUninitialized   : false
                            }));
var moment                = require('moment');
var promise               = require('bluebird');

// Switch between TCP/IP ports depending on environment.  Necessary in order to
// keep separate dev and prod directories and to deal with the way reverse
// proxying works.
switch(app.get('env')) {
    case 'development':
        var port = 3010;
        break;
    case 'production':
        var port = 3011;
        break;
    default:
        throw new error('Unknown execution environment: ', app.get('env'));
}

// ----------------------------------------------------------------------------
// Mongoose
// Referenced files mondodev and mongoprod are intentionally excluded from
// source control.
// ----------------------------------------------------------------------------
switch(app.get('env')) {
    case 'development':
        var mongo = require('./mongoDev.js');
        break;
    case 'production':
        var mongo = require('./mongoProd.js');
        break;
    default:
        throw new error('Unknown execution environment: ', app.get('env'));
}

// ----------------------------------------------------------------------------
// Models
// ----------------------------------------------------------------------------
var Comment               = require('./models/comment');
var User                  = require('./models/user');
var user                  = require('./models/user');
var Poem                  = require('./models/poem');

// ----------------------------------------------------------------------------
// Facebook Auth
// ----------------------------------------------------------------------------
passport.use(new FacebookStrategy({
    clientID: credentials.facebook.app_id,
    clientSecret: credentials.facebook.app_secret,
    callbackURL: credentials.facebook.callback,
    profileFields:['id', 'displayName', 'name', 'email']
    }, function(accessToken, refreshToken, profile, done) {
        "use strict";
        console.log(profile);
        var me = new user({
            email:profile.emails[0].value,
            provider:profile.provider,
            username:profile.displayName,
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
    "use strict";
    console.log(user);
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    "use strict";
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
  "use strict";
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
    "use strict";
    res.render('facebook/home', { user: req.user });
  });

app.get('/login/facebook',
  passport.authenticate('facebook', { scope: ['email'] }));

app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    "use strict";
    res.redirect('/');
  });

app.get('/facebook/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    "use strict";
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
    "use strict";
    if (error) {
      console.error(error);
      return process.exit(1);
    } else {
      console.log('Listening on port: ' + port + '.');
    }
  });
