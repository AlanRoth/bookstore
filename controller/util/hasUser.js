var userModel = require('../../models/user.js')

var hasUser = async function (username) {
  return await userModel.findOne({ username: username }).exec().then(function (result) {
    console.log('result: ' + result)
    if (result === null) {
      return false
    }
    if (result.username === 'undefined') {
      return false
    }
    if (result.username === username) {
      return result
    }
  })
}

module.exports = hasUser
