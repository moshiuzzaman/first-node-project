var express = require('express');
var router = express.Router();
var orderModule = require('../modules/order')
const checkLoginUser=require('../middleware/checkLoginUser')


/* GET home page. */
router.get('/',checkLoginUser, function (req, res, next) {
    const orders = orderModule.find()
    orders.exec((err, data) => {
        if (err) throw err;
        console.log(data)
    })
    res.status(200).end()

    res.end()
});



module.exports = router;
