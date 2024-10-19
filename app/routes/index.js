const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/auth', require('./auth'));
router.use('/users', require('./users'));

// router.use('/properties', require('./properties'));
// router.use('/contact', require('./contact'));
// router.use('/billing', require('./billing'));
// router.use('/stays', passport.authenticate('jwt', { session: false }), require('./stays'));
// router.use('/eats', passport.authenticate('jwt', { session: false }), require('./eats'));
// router.use('/admin', passport.authenticate('jwt', { session: false }), require('./admin'));
// router.use('/explore', passport.authenticate('jwt', { session: false }), require('./explore'));
// router.use('/activities', passport.authenticate('jwt', { session: false }), require('./activities'));
// router.use('/locations', passport.authenticate('jwt', { session: false }), require('./locations'));

module.exports = router;
