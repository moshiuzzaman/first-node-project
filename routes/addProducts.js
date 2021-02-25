var express = require('express');
var router = express.Router();
var productsModule = require('../modules/addProducts')
const checkLoginUser = require('../middleware/checkLoginUser')

// Post products
router.post('/', checkLoginUser, function (req, res, next) {
  const productName = req.body.productName;
  const quantity = req.body.quantity;

  // Check user role. 
  if (req.role === "super admin") {
    // create products object
    const productsDetails = new productsModule({
      productName,
      quantity
    })

    // save products in database
    productsDetails.save((err, data) => {
      if (err) throw err;
      console.log('successfully added products');
      res.sendStatus(200).end()
    })
  } else {
    console.log('only super admin can access this api');
    res.sendStatus(403).end()
  }

});

module.exports = router;