var createError = require('http-errors')
var express = require('express')
var mongoose = require('mongoose')
var path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')
var cookieParser = require('cookie-parser')

var indexRouter = require('./routes/index')
var adminRouter = require('./routes/admin')
var basketRouter = require('./routes/basket')
var checkoutRouter = require('./routes/checkout')

var app = express()

var uri = 'mongodb+srv://app-user:app@cluster0.apymg.mongodb.net/bookstore?retryWrites=true&w=majority'

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser())
app.use(session({
  secret: 'secret',
  cookie: {
    maxAge: 60000,
    secure: false
  }
}))

app.use('/', indexRouter)
app.use('/basket', basketRouter)
app.use('/admin', adminRouter)
app.use('/checkout', checkoutRouter)

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
