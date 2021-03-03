const express = require('express');
const router = express.Router();
const orderModule = require('../modules/order')
const checkLoginUser = require('../middleware/checkLoginUser')
const checkRole = require('../middleware/checkingRole')

// Get pending orders 
router.get('/', checkLoginUser, checkRole.checkAdmin, async (req, res, next) => {
    // Find pending order from database 
    try {
        const pendingOrders = await orderModule.find({ 'status': 'pending' })
        res.status(200).json(pendingOrders)
    } catch (error) {
        res.status(500).send(error)
    }

});

module.exports = router;
