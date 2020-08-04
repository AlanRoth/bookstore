var express = require('express')
var router = express.Router()

router.post('/addtobasket', function (req, res, next) {
  if (!req.session.basket) {
    req.session.basket = []
  }
  if (req.body.addBasket) {
    req.session.basket.push(req.body.addBasket)
  }
  res.redirect('/browse')
})

router.post('/removefrombasket', function (req, res, next) {
  if (req.session.basket) {
    req.session.basket.splice(req.session.basket.indexOf(req.body.remove), 1)
  }
  res.redirect('/checkout/basket')
})

module.exports = router
