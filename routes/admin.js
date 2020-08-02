var express = require('express')
var router = express.Router()
var login = require('../controller/authenticate/auth')

router.get('/', function (req, res, next) {
  res.redirect('/admin/login')
})

router.get('/login', function (req, res, next) {
  res.render('login')
})

router.get('/console', function (req, res, next) {
  res.send('Please Login!')
})

router.post('/user', function (req, res, next) {
  res.send('user Post recieved :)')
})

router.post('/login', async function (req, res, next) {
  var loginResult = await login(req.body.username, req.body.password)
  if (loginResult) {
    res.render('admin', { title: 'Admin Console' })
  } else {
    res.render('login', { title: 'Try Again', errors: ['Username or password is wrong'] })
  }
})

module.exports = router
