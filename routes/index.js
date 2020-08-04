var express = require('express')
var router = express.Router()
var login = require('../controller/authenticate/auth')
var add = require('../controller/database/addUser')
var validate = require('../controller/util/validate')
var getUser = require('../controller/database/getUser')
var getBooks = require('../controller/database/getBooks')
var getUserSession = require('../controller/util/getUserSession')
var getOrders = require('../controller/database/getOrders')

/* GET home page. */
router.get('/', async function (req, res, next) {
  var user = await getUserSession(req)
  if (user) {
    res.render('index', { title: 'Welcome', username: user.username })
    return
  }

  res.render('index', { title: 'Welcome', username: 'Guest' })
})

router.get('/logout', function (req, res, next) {
  if (req.session.userid) {
    req.session.destroy()
  }
  res.set('Refresh', '2;/')
  res.send('You have logged out!')
})

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' })
})

router.post('/login', async function (req, res, next) {
  var errors = []
  errors = errors.concat(await validate(req.body.username, req.body.password, req.body.password))
  var user = await getUser({ username: req.body.username })
  if (user === false) {
    errors.push('Username does not exist!')
  }
  if (errors !== undefined && errors !== null && errors.length > 0) {
    res.render('login', { title: 'Try Again', errors: errors })
    return
  }
  var loginResult = await login(req.body.username, req.body.password)
  if (loginResult) {
    req.session.userid = user._id
    res.render('index', { title: 'Welcome', username: req.body.username })
  } else {
    errors.push('Username or Password is incorrect!')
    res.render('login', { title: 'Try Again', errors: errors })
  }
})

router.get('/signup', function (req, res, next) {
  res.render('signup', { title: 'Sign Up' })
})

router.post('/signup', async function (req, res, next) {
  var errors = []
  errors = errors.concat(await validate(req.body.username, req.body.password, req.body.repeated))
  if (await getUser({ username: req.body.username })) {
    errors.push('Username already exists!')
  }
  if (errors !== undefined && errors !== null && errors.length > 0) {
    res.render('signup', { title: 'Try Again', errors: errors })
    return
  }
  var result = add(req.body.username, req.body.password)
  if (result) {
    req.session.userid = await getUser({ username: req.body.username })
    // res.render('index', { title: 'Welcome', username: req.body.username })
    res.redirect('/')
  } else {
    errors.push('Something went wrong! Try again')
    res.render('signup', { title: 'Try Again', errors: errors })
  }
})

router.get('/books', async function (req, res, next) {
  res.send(await getBooks({}))
})

router.get('/browse', async function (req, res, next) {
  var user = await getUserSession(req)
  var username = 'Guest'
  if (user) {
    username = user.username
  }
  res.render('browse', { username: username, books: await getBooks({}) })
})

router.get('/orders', async function (req, res, next) {
  var user = await getUserSession(req)
  var username = 'Guest'
  if (user) {
    username = user.username
  }
  res.render('orders', { username: username, orders: await getOrders({ user: username }) })
})

module.exports = router
