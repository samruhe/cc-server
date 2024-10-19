'use strict'
const mongoose = require('mongoose');

const schema = mongoose.Schema({
  first_name: String,
  last_name: String,
  full_name: String,
  phone: String,
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  verified_email: {
    type: Boolean,
    default: false,
  },
  code: String,
  date_created: Date,
  roll: String, // admin
});

schema.methods.sanitize = function() {
  const obj = this.toJSON();
  delete obj.password;
  return obj;
}

module.exports = mongoose.model('User', schema);
