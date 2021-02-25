var express = require('express');
var router = express.Router();
var orderModule = require('../modules/order');
const checkLoginUser=require('../middleware/checkLoginUser')

router.post('/',checkLoginUser, function (req, res, next) {
    const orderId=req.body.orderId;
    const status =req.body.status
    const updateStatus=orderModule.findByIdAndUpdate(orderId,{status:status})
    updateStatus.exec((err,doc)=>{
        if(err) throw err
        console.log('update successfully')
    })
 res.end()
});



module.exports = router;
