var userModel = require('../../models/user.js')

var getUser = async function (filter) {
  return await userModel.findOne(filter).exec().then(function (result) {
    if (result === null) {
      return false
    }
    if (result.username === undefined) {
      return false
    }
    return result
  })
}

module.exports = getUser
