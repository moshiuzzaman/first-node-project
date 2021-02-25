var express = require('express');
var router = express.Router();
var orderModule = require('../modules/order');
const checkLoginUser = require('../middleware/checkLoginUser')

// Post order status
router.post('/', checkLoginUser, function (req, res, next) {
    const orderId = req.body.orderId;
    const status = req.body.status
    // check user role
    if (req.role === "admin") {
        // Find order by order Id and update order status
        const updateStatus = orderModule.findByIdAndUpdate(orderId, { status: status })
        updateStatus.exec((err, doc) => {
            if (err) throw err
            console.log('update successfully')
        })
        res.sendStatus(205).end()
    } else {
        console.log('only admin can access this api');
        res.sendStatus(403).end()
    }

});

module.exports = router;
