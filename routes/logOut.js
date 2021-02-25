var express = require('express');
var router = express.Router();

/* GET logout  */
router.get('/', function(req, res, next) {
  res.clearCookie('jwt');
  console.log('logout successfully')
  res.sendStatus(200).end()
});

module.exports = router;
