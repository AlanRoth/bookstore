var orderModel = require('../../models/order.js')

var getOrders = async function (filter) {
  return await orderModel.find(filter).exec().then(function (result) {
    console.log(filter)
    console.log(result)
    if (result === null) {
      return false
    }
    if (result === undefined) {
      return false
    }
    return result
  })
}

module.exports = getOrders
