var passport = require('passport');
var MagicLinkStrategy = require('passport-magic-link').Strategy;

const mongoose = require('mongoose');

const User = mongoose.model('User');

passport.use(new MagicLinkStrategy({
  secret: 'keyboard cat',
  userFields: ['email'],
  tokenField: 'token',
  verifyUserAfterToken: true
}, function send(user, token) {
  var link = 'http://localhost:3001/api/auth/magiclogin/callback?token=' + token;
  var msg = {
    to: user.email,
    from: process.env['EMAIL'],
    subject: 'Sign in to Todos',
    text: 'Hello! Click the link below to finish signing in to Todos.\r\n\r\n' + link,
    html: '<h3>Hello!</h3><p>Click the link below to finish signing in to Todos.</p><p><a href="' + link + '">Sign in</a></p>',
  };
  // return sendgrid.send(msg);
  console.log(link)
  return true;
}, function verify(user) {
  return new Promise(function(resolve, reject) {
    User.findOne({ email: user.email })
      .then((existingUser) => {
        if (existingUser) {
          return resolve(existingUser);
        } else {
          User.create({
            email: user.email,
            verified_email: true,
            created_date: Date.now(),
          })
            .then((newUser) => {
              return resolve(newUser);
            })
            .catch((err) => {
              return reject(err);
            })
        }
      })
      .catch((err) => {
        return reject(err);
      });
  });
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, user);
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});
