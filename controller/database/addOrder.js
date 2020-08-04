const OrderModel = require('../../models/order.js')

var addOrder = function (user, total, address, postcode, county, order) {
  var newOrder = new OrderModel({ user: user, total: total, address: address, postcode: postcode, county: county, order: order })
  return newOrder.save(function (err, order) {
    if (err) return console.error(err)
    console.log(order.user + '\'s order added to database')
    return true
  })
}

module.exports = addOrder
