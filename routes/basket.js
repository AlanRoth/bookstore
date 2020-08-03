var express = require('express')
var router = express.Router()
var getUserSession = require('../controller/util/getUserSession')

router.post('/addtobasket', function (req, res, next) {
  console.log(req.body)
  console.log(req.session.basket)
  if (req.session.basket) {
    if (req.body.addBasket) {
      req.session.basket.push(req.body.addBasket)
    }
  } else {
    req.session.basket = []
    if (req.body.addBasket) {
      req.session.basket.push(req.body.addBasket)
    }
  }
  res.redirect('/browse')
})

router.get('/', async function (req, res, next) {
  var user = await getUserSession(req)
  var username = 'Guest'

  if (req.session.basket) {
    res.render('basket', { basket: req.session.basket })
  }
  if (user) {
    username = user.username
  }

  res.render('basket', { username: username })
})

module.exports = router
