var express = require('express');
var router = express.Router();
var orderModule = require('../modules/order')
var productsModule = require('../modules/addProducts')
const checkLoginUser = require('../middleware/checkLoginUser')
const checkRole = require('../middleware/checkingRole')

// Post order in database
router.post('/', checkLoginUser, checkRole.checkUser, async (req, res, next) => {
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

module.exports = router;
