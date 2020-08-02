var createError = require('http-errors')
var express = require('express')
var mongoose = require('mongoose')
var path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var adminRouter = require('./routes/admin')

var app = express()

var uri = 'mongodb+srv://app-user:app@cluster0.apymg.mongodb.net/bookstore?retryWrites=true&w=majority'

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/admin', adminRouter)

// app.use(session({
//  secret: 'secret',
//  resave: false,
//  saveUninitialized: true,
//  cookie: {
//    secure: false,
//    httpOnly: true,
//    maxAge: 1000 * 60 * 60 * 24
//  }
// }))

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error("Couldn't connect to MongoDB: " + err))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
