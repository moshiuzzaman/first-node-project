var express = require('express');
var router = express.Router();
var orderModule = require('../modules/order')
const checkLoginUser = require('../middleware/checkLoginUser')


/* GET All orders. */
router.get('/', checkLoginUser, function (req, res, next) {
    // Check user role
    if (req.role === "super admin") {
        
        // find all orders from database
        const orders = orderModule.find()
        orders.exec((err, data) => {
            if (err) throw err;
            console.log(data)
        })
        res.sendStatus(200).end()
    } else {
        console.log('only Super admin can access this api');
        res.sendStatus(403).end()
    }

});



module.exports = router;
