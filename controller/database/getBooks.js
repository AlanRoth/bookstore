var bookModel = require('../../models/book.js')

var getBooks = async function (filter) {
  return await bookModel.find(filter).exec().then(function (result) {
    if (result === null) {
      return false
    }
    if (result === undefined) {
      return false
    }
    return result
  })
}

module.exports = getBooks
