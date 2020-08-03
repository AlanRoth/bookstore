var express = require('express')
var router = express.Router()

router.post('/addtobasket', function (req, res, next) {
  res.send('Add to basket')
})

router.get('/', function (req, res, next) {
  res.send('Got Basket')
})

module.exports = router
