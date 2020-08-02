var hasUser = require('../util/hasUser.js')

const UserModel = require('../../models/user.js')

var addUser = async function (username, password) {
  if (await hasUser(username)) {
    console.log('User is already in database')
    return
  }
  var newUser = new UserModel({ username: username, password: password, isAdmin: false })
  newUser.save(function (err, user) {
    if (err) return console.error(err)
    console.log(user.username + ' added to database')
  })
}

module.exports = addUser
