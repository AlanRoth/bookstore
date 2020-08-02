var userModel = require('../../models/user.js')

var auth = async function (username, password) {
  return await userModel.findOne({ username: username, password: password }).exec().then(function (result) {
    if (result === null) {
      return false
    }
    if (result.username === 'undefined' || result.password === 'undefined') {
      return false
    }
    if (result.username === username && result.password === password) {
      return result
    }
  })
}

module.exports = auth
