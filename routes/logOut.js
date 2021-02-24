var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.clearCookie('jwt')
  res.status(200).redirect('/')
});

module.exports = router;
