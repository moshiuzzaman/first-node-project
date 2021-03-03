var express = require('express');
var router = express.Router();
var orderModule = require('../modules/order');
const checkLoginUser = require('../middleware/checkLoginUser')
const checkRole = require('../middleware/checkingRole')

// Post order status
router.patch('/', checkLoginUser, checkRole.checkAdmin, async (req, res, next) => {
    const orderId = req.body.orderId;
    const status = req.body.status;
    // Find order by order Id and update order status
    try {
        await orderModule.findByIdAndUpdate(orderId, { status })
        res.status(205).send('order status updated successfully')
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router;
