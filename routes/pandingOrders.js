const express = require('express');
const router = express.Router();
const orderModule = require('../modules/order')
const checkLoginUser = require('../middleware/checkLoginUser')

// Get pending orders 
router.get('/', checkLoginUser, function (req, res, next) {

    if (req.role === 'admin') {
        // Find pending order from database        
        const pendingOrder = orderModule.find({'status':'pending'})
        pendingOrder.exec((err, data) => {
            if (err) throw err;
            console.log(data)
        })
        res.sendStatus(200).end()
    } else {
        console.log('user or super admin are not able for a order')
        res.sendStatus(403).end()
    }
});

module.exports = router;
