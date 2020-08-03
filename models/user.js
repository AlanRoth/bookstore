const mongoose = require('mongoose')

var User = mongoose.model('User', {
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trime: true
  },
  isAdmin: Boolean
}, 'users')

module.exports = User
