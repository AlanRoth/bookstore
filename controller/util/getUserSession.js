var getUser = require('../database/getUser')

async function getUserSession (req) {
  if (req.session.userid) {
    var user = await getUser({ _id: req.session.userid })
    if (user) {
      return user
    }
    return false
  }
}

module.exports = getUserSession
