var getUser = require('./getUser')

const UserModel = require('../../models/user.js')

var removeUser = async function (username) {
  var hasUser = await getUser(username)
  if (hasUser === null || hasUser === undefined || hasUser === false) {
    console.log('User does not exist!')
    return
  }
  await UserModel.findOneAndDelete({ username: username }, function (err, result) {
    if (err) return console.log(err)
    console.log(result.username + ' was removed from database!')
  })
}

module.exports = removeUser
