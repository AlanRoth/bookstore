var getBook = require('./getBook.js')

const BookModel = require('../../models/book.js')

var updateBook = async function (isbn, title, price, author, genre, imagePath, stock) {
  var book = await getBook({ isbn: isbn })
  if (!book) {
    console.log('Book is not in the database!')
    return
  }

  BookModel.findOneAndUpdate({ isbn: book.isbn }, { title: title, price: price, author: author, genre: genre, image: imagePath, stock: stock }, function (err, book) {
    if (err) return console.error(err)
    console.log(book.title + ' was updated!')
  })
}

module.exports = updateBook
