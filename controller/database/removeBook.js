var getBook = require('./getBook')

const BookModel = require('../../models/book.js')

var removeBook = async function (isbn) {
  var hasBook = await getBook({ isbn: isbn })
  if (hasBook === null || hasBook === undefined || hasBook === false) {
    console.log('Book does not exist!')
    return
  }
  await BookModel.findOneAndDelete({ isbn: isbn }, function (err, result) {
    if (err) return console.log(err)
    console.log(result.title + ' was removed from database!')
  })
}

module.exports = removeBook
