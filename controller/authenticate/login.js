var mongoose = require('mongoose');
var userModel = require('../../models/user.js');

var login = function(user, password) {
  console.log("Connection: " + mongoose.connection.readyState);
  var User = userModel;
  var authenticated = false;
  User.findOne({username: user}, {password: password}, function(err, user) {
    console.log("I'm in here weee");
    return true;
  });

}

module.exports=login;
