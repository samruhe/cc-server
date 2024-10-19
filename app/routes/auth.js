const express = require('express');
const router = express.Router();
const passport = require('passport');

const { CLIENT_ROOT } = process.env;

router.get('/login/success', (req, res) => {
  console.log('MESSAGE', req.session)
  res.redirect(`${CLIENT_ROOT}/login/verify`)
});

router.get('/loggedInUser', (req, res) => {
  try {
    res.send({ user: req.user });
  } catch (e) {
    next(e);
  }
});

router.post('/magiclogin', passport.authenticate('magiclink', {
  action: 'requestToken',
  failureRedirect: `${CLIENT_ROOT}/login`,
  failureMessage: true
}), function(req, res, next) {
  res.send({ message: 'ok' });
});

router.get('/magiclogin/callback', passport.authenticate('magiclink', {
  successReturnToOrRedirect: '/api/auth/login/success',
  failureRedirect: `${CLIENT_ROOT}/login`,
  failureMessage: true
}));

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect(`${CLIENT_ROOT}/login`);
  });
});

module.exports = router;
