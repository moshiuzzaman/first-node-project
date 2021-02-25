var express = require('express');
var router = express.Router();
var orderModule = require('../modules/order')
const checkLoginUser = require('../middleware/checkLoginUser')

// Post order in database
router.post('/', checkLoginUser, function (req, res, next) {
    const productId = req.body.productId;
    const quantity = req.body.quantity;
// check user role
    if (req.role === "user") {
        // create order object
        const orderDetails = new orderModule({
            productId,
            quantity,
            userId: req.userId
        })
        // Save order in database
        orderDetails.save((err, data) => {
            if (err) throw err;
            console.log('Ordered Successfully');
            res.status(200).end()

        })
    }else{
        console.log('admin or super admin are not able for a order')
        res.sendStatus(403).end()
    }
});

module.exports = router;
