var bookModel = require('../../models/book.js')

var getBook = async function (filter) {
  return await bookModel.findOne(filter).exec().then(function (result) {
    if (result === null) {
      return false
    }
    if (result === undefined) {
      return false
    }
    return result
  })
}

module.exports = getBook
