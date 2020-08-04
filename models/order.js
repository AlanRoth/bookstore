const mongoose = require('mongoose')
// var book = require('./book.js')

var Order = mongoose.model('Order', {
  user: {
    type: String,
    required: true,
    trim: true
  },
  total: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  postcode: {
    type: String,
    required: true,
    trim: true
  },
  county: {
    type: String,
    required: true,
    trim: true
  },
  order: {
    type: [String],
    require: true,
    trim: true
  }
}, 'orders')

module.exports = Order
