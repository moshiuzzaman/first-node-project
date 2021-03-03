var express = require('express');
var router = express.Router();

/* GET logout  */
router.get('/', (req, res, next)=> {
  res.clearCookie('jwt');
  res.status(202).send('logout successfully')
});

module.exports = router;
