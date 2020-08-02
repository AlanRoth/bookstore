var express = require('express')
var router = express.Router()
var login = require('../controller/authenticate/auth')
var add = require('../controller/database/add')
var validate = require('../controller/util/validate')
var hasUser = require('../controller/util/hasUser')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Welcome', username: 'Guest' })
})

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' })
})

router.post('/login', async function (req, res, next) {
  var errors = []
  errors = errors.concat(await validate(req.body.username, req.body.password, req.body.repeated))
  if (await hasUser(req.body.username) === false) {
    errors.push('Username does not exist!')
  }
  if (errors !== undefined && errors !== null && errors.length > 0) {
    res.render('login', { title: 'Try Again', errors: errors })
    return
  }
  var loginResult = await login(req.body.username, req.body.password)
  if (loginResult) {
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
  if (await hasUser(req.body.username)) {
    errors.push('Username already exists!')
  }
  if (errors !== undefined && errors !== null && errors.length > 0) {
    res.render('signup', { title: 'Try Again', errors: errors })
    return
  }
  var result = add(req.body.username, req.body.password)
  if (result) {
    res.render('index', { title: 'Welcome', username: req.body.username })
  } else {
    errors.push('Something went wrong! Try again')
    res.render('signup', { title: 'Try Again', errors: errors })
  }
})

module.exports = router
