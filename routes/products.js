var express = require('express');
var router = express.Router();
var Products = require('../Schemas/productsSchema')
const checkLoginUser = require('../middleware/checkLoginUser')
const checkRole = require('../middleware/checkingRole')
const axios = require("axios");
// Get products 
router.get('/',
    async (req, res, next) => {
        try {

            // Find all products from database
            const products = await Products.find()
            res.status(200).send(products)
        } catch (error) {
            res.status(500).send(error)
        }
    });
router.get('/pagination',
    async (req, res, next) => {
        try {
            const pagination = req.query.pagination
                ? parseInt(req.query.pagination)
                : 8
            const page = req.query.page ? parseInt(req.query.page) : 1
            console.log(page);
            // Find all products from database
            const products = await Products.find()
                .skip((page - 1) * pagination)
                .limit(pagination)
            res.status(200).send(products)
        } catch (error) {
            res.status(500).send(error)
        }
    });


router.get('/selected-product',
    async (req, res, next) => {
        try {
            const id = req.query.id
            // Find all products from database
            const product = await Products.find({ "_id": id })
            res.status(200).send(product)
        } catch (error) {
            res.status(500).send(error)
        }
    });

// Post products
router.post(
    '/add-product',
    checkLoginUser,
    checkRole.checkSuperAdmin,
    async (req, res, next) => {

        try {
            // create products object
            const productsDetails = new Products(req.body)
            // save products in database
            const addProducts = await productsDetails.save()
            console.log('successfully added products');
            res.status(200).send({
                message: 'successfully added product'
            })

        } catch (error) {
            res.status(500).send(error)
        }
    });

// generate-products
router.post('/generate-products',
    // checkLoginUser,
    // checkRole.checkSuperAdmin,
    async (req, res, next) => {
        try {
            const getProducts = await axios.get("https://fakestoreapi.com/products");
            const products = await Products.insertMany(getProducts.data);
            res.status(200).send(products);
        } catch (error) {
            res.status(500).send(error.message)
        }
    })
router.post('/delete-product',
    checkLoginUser,
    checkRole.checkSuperAdmin,
    async (req, res, next) => {
        try {
            const productId = req.body.productId
            // find user by id and delete
            const deleteProduct = await Products.findByIdAndDelete(productId)
            if (deleteProduct === null) {
                res.send('ProductId is not valid/already deleted')
            }
            const products = await Products.find()
            res.status(200).send({
                message: 'Product deleted successfully',
                products
            })
        } catch (error) {
            res.status(500).send(error.message)
        }
    });

router.get('/search-by-name',
    async (req, res, next) => {
        try {
            const products = await Products.find({ 'title': { '$regex': req.query.value } })
            res.status(200).send(products)
        } catch (error) {
            res.status(500).send(error.message)
        }

    });




module.exports = router;
