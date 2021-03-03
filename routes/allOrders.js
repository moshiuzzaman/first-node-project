var express = require('express');
var router = express.Router();
var orderModule = require('../modules/order')
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

module.exports = router;
