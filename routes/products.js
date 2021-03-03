var express = require('express');
var router = express.Router();
var productsModule = require('../modules/addProducts')
const checkLoginUser = require('../middleware/checkLoginUser')

// Get products 
router.get('/', checkLoginUser, async (req, res, next) => {
    // Find all products from database
    try {
        const products = await productsModule.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).send(error)
    }

});

module.exports = router;
