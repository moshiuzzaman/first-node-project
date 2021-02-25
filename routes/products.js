var express = require('express');
var router = express.Router();
var productsModule = require('../modules/addProducts')
const checkLoginUser=require('../middleware/checkLoginUser')

router.get('/',checkLoginUser, function (req, res, next) {
    const products=productsModule.find()
    products.exec((err,data)=>{
        if (err) throw err;
        console.log(data)
        
    })
    res.status(200).end()
});

module.exports = router;
