var express = require('express');
var router = express.Router();
var productsModule = require('../modules/addProducts')
const checkLoginUser=require('../middleware/checkLoginUser')


router.post('/',checkLoginUser, function (req, res, next) {
  const productName = req.body.productName;
  const quantity = req.body.quantity;

  const productsDetails = new productsModule({
    productName,
    quantity
  })

  productsDetails.save((err, data) => {
    if (err) throw err;
    console.log('successfully added products');
    res.status(200).end()

  })


});



module.exports = router;