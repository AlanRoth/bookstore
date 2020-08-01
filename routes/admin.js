var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var login = require('../controller/authenticate/login');

router.get('/', function(req, res, next) {
  res.redirect('/admin/login');
});

router.get('/login', function(req, res, next) {
  res.render('login');
})

router.get('/console', checkAuth, function(req, res, next) {
  res.render('admin', {title: 'Admin Console'})
})

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var loginResult = login(username, password);
  if(loginResult) {
    res.redirect('/admin/console')
  } else {
    res.redirect('/');
  }
})

function checkAuth(req, res, next) {
  if(!req.body.username === 'admin') {
    res.send("You Shouldn't be here!");
  } else {
    next();
  }
}

module.exports = router;
