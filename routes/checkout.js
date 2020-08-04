var express = require('express')
var router = express.Router()
var getUserSession = require('../controller/util/getUserSession')
var getBook = require('../controller/database/getbook')
var addOrder = require('../controller/database/addOrder')

router.get('/basket', async function (req, res, next) {
  var user = await getUserSession(req)
  var username = 'Guest'
  var books = []
  if (user) {
    username = user.username
  }
  if (req.session.basket) {
    for (var item of req.session.basket) {
      books.push(await getBook({ isbn: item }))
    }
  }

  res.render('basket', { username: username, basket: books })
})

router.post('/delivery', async function (req, res, next) {
  var user = await getUserSession(req)
  var username = 'Guest'
  var books = []
  if (user) {
    username = user.username
  }

  if (req.body.order) {
    if (req.session.basket) {
      for (var item of req.session.basket) {
        books.push(await getBook({ isbn: item }))
      }
    }
    res.render('delivery', { username: username, basket: books })
  } else {
    res.redirect('/basket')
  }
})

router.post('/order', async function (req, res, next) {
  console.log(req.body)
  console.log(req.body.Username)
  if (req.body) {
    await addOrder(req.body.Username, req.body.Total, req.body.Address, req.body.Postcode, req.body.County, req.body.order)
    if (req.session.basket) {
      req.session.basket = []
    }
  }
  res.redirect('/')
})

module.exports = router
