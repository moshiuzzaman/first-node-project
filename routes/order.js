var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var orderModule = require('../modules/order')
const checkLoginUser=require('../middleware/checkLoginUser')


router.post('/',checkLoginUser, function (req, res, next) {
    const productId= req.body.productId;
    const quantity=req.body.quantity;
    console.log('this is order page')
    const token = req.cookies.jwt
    var decoded = jwt.decode(token);
    const orderDetails = new orderModule({
        productId,
        quantity,
        userId:decoded.userId
      })
      orderDetails.save((err, data) => {
        if (err) throw err;
        console.log('Ordered Successfully');
        res.status(200).end()
    
      })
});

module.exports = router;
