var express = require('express');
var router = express.Router();
var productsModule = require('../modules/addProducts')
const checkLoginUser=require('../middleware/checkLoginUser')

// Get products 
router.get('/',checkLoginUser, function (req, res, next) {
    // Find all products from database
    const products=productsModule.find()
    products.exec((err,data)=>{
        if (err) throw err;
        console.log(data)     
    })
    res.sendStatus(200).end()
});

module.exports = router;
