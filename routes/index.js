var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var userObject = {name: "Anton", isAuthorized: true};
  if(userObject === undefined) {
    userObject = {name: "Guest", isAuthorized: false};
  }

  res.render('index', { title: "Welcome", user: userObject});
});

module.exports = router;
