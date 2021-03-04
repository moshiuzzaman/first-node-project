var express = require('express');
var router = express.Router();
var orderModule = require('../Schemas/orderSchema')
var productsModule = require('../Schemas/productsSchema')
const checkLoginUser = require('../middleware/checkLoginUser')
const checkRole = require('../middleware/checkingRole')


/* GET All orders. */
router.get('/', checkLoginUser, checkRole.checkSuperAdmin, async (req, res, next) => {

    // find all orders from database
    try {
        const orders = await orderModule.find()
        res.status(200).json(orders)

    } catch (error) {
        res.status(500).send(error)
    }

});

// Post order in database
router.post('/make-order', checkLoginUser, checkRole.checkUser, async (req, res, next) => {
    // create order object
    const orderDetails = new orderModule({
        ...req.body,
        userId: req.userId
    })
    try {
        await orderDetails.save()
        res.status(200).send('Ordered Successfully')
    } catch (error) {
        res.status(500).send(error)
    }
});

// patch order status
router.patch('/update-status', checkLoginUser, checkRole.checkAdmin, async (req, res, next) => {
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

// Get pending orders 
router.get('/pending-orders', checkLoginUser, checkRole.checkAdmin, async (req, res, next) => {
    // Find pending order from database 
    try {
        const pendingOrders = await orderModule.find({ 'status': 'pending' })
        res.status(200).json(pendingOrders)
    } catch (error) {
        res.status(500).send(error)
    }

});

module.exports = router;
