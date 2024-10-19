const express = require('express');
const router = express.Router();
const passport = require('passport');
const helpers = require('../helpers');
const mongoose = require('mongoose');

const User = mongoose.model('User');


/////////////////////////////////////////////////////////
//////// REQUIRE USER TO BE LOGGED IN BELOW HERE ////////
/////////////////////////////////////////////////////////
router.use(passport.authenticate('session'));

router.put('/updateProfile', async (req, res, next) => {
  try {
    const updateFields = {};

    if (req.body.name) {
      const name = req.body.name.trim();
      updateFields.first_name = name.split(' ')[0];
      updateFields.last_name = name.split(' ')[1] || '';
      updateFields.full_name = name;
    }

    const user = await User.findByIdAndUpdate(req.user._id, updateFields, { new: true });

    res.send({
      user,
    });
  } catch (e) {
    next(e);
  }
});


module.exports = router;
