var getBook = require('./getBook.js')

const BookModel = require('../../models/book.js')

var addBook = async function (isbn, title, price, author, genre, imagePath, stock) {
  if (await getBook({ isbn: isbn })) {
    console.log('Book is already in database')
    return
  }
  if (imagePath === null || imagePath === undefined) {
    imagePath = '/images/bookimages/placeholder.png'
  }
  var newBook = new BookModel({ isbn: isbn, title: title, price: price, author: author, genre: genre, image: imagePath, stock: stock })
  newBook.save(function (err, book) {
    if (err) return console.error(err)
    console.log(book.title + ' added to database')
  })
}

module.exports = addBook
