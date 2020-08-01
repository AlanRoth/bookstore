const {schema, model} = require('mongoose');

const User = model('User', {
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = User;
