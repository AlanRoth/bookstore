var express = require('express')
var router = express.Router()
var login = require('../controller/authenticate/auth')
var getUser = require('../controller/database/getUser')
var addUser = require('../controller/database/addUser')
var addBook = require('../controller/database/addBook')
var getBook = require('../controller/database/getBook')
var removeUser = require('../controller/database/removeUser')
var removeBook = require('../controller/database/removeBook')
var updateBook = require('../controller/database/updateBook')
var getBooks = require('../controller/database/getBooks')

router.get('/', function (req, res, next) {
  res.redirect('/admin/login')
})

router.get('/login', function (req, res, next) {
  res.render('login')
})

router.get('/console', function (req, res, next) {
  res.send('Please Login!')
})

router.post('/user', async function (req, res, next) {
  if (req.body.remove) {
    await removeUser(req.body.username)
  }
  if (req.body.add) {
    await addUser(req.body.username, req.body.password)
  }
  res.render('admin/admin')
})

router.post('/book', async function (req, res, next) {
  if (req.body.remove) {
    await removeBook(req.body.isbn)
  }
  if (req.body.add) {
    await addBook(req.body.isbn, req.body.title, req.body.price, req.body.author, req.body.genre, req.body.imagePath, req.body.stock)
  }
  if (req.body.update) {
    await updateBook(req.body.isbn, req.body.title, req.body.price, req.body.author, req.body.genre, req.body.image, req.body.stock)
  }
  res.render('admin/admin', { books: await getBooks({}) })
})

router.get('/book', async function (req, res, next) {
  var book = await getBook({ isbn: req.query.isbn })
  if (book) {
    res.render('admin/book', { isbn: book.isbn, title: book.title, price: book.price, author: book.author, genre: book.genre, image: book.image, stock: book.stock })
  } else {
    res.render('admin/admin', { books: await getBooks({}) })
  }
})

router.post('/login', async function (req, res, next) {
  var loginResult = await login(req.body.username, req.body.password)
  var user = await getUser({ username: req.body.username })
  if (loginResult && user.isAdmin) {
    res.render('admin/admin', { title: 'Admin Console', books: await getBooks({}) })
  } else {
    res.render('login', { title: 'Try Again', errors: ['Username or password is wrong'] })
  }
})

module.exports = router
