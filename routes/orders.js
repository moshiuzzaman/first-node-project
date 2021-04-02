var express = require('express');
var router = express.Router();
var orderModule = require('../Schemas/orderSchema')
var productsModule = require('../Schemas/productsSchema')
const checkLoginUser = require('../middleware/checkLoginUser')
const checkRole = require('../middleware/checkingRole')



var cors = require('cors')
var app = express();
app.use(cors())

/* GET All orders. */
router.get('/',
    checkLoginUser,
     checkRole.checkAdminOrSuperAdmin ,
    async (req, res, next) => {
        try {
            // find all orders from database
            const orders = await orderModule.find()
            res.status(200).json(orders)

        } catch (error) {
            res.status(500).send(error)
        }

    });
router.get('/user-orders',
    checkLoginUser,
     checkRole.checkUser ,
    async (req, res, next) => {
        const userId=req.userId
        try {
            // find all orders from database
            const orders = await orderModule.find({ 'userId': userId })
            res.status(200).json(orders)

        } catch (error) {
            res.status(500).send(error)
        }

    });
// Post order in database
router.post('/make-order',
    checkLoginUser,
    checkRole.checkUser,
    async (req, res, next) => {
        console.log(req.body.orderData.orderedProducts);
        try {
            // create order object
            const orderDetails = new orderModule({
                ...req.body.orderData,
                orderedProducts:req.body.orderData.orderedProducts,
                userId: req.userId
            })
            await orderDetails.save()
            res.status(200).send({
                authorized:true,
                message:'Ordered Successfully'
            })
        } catch (error) {
            res.status(500).send(error)
        }
    });

// patch order status
router.patch('/update-status',
    checkLoginUser,
    checkRole.checkAdminOrSuperAdmin,
    async (req, res, next) => {
        try {
            const orderId = req.body.id;
            const status = req.body.status;
            console.log(orderId,status);
            // Find order by order Id and update order status
            await orderModule.findByIdAndUpdate(orderId, {status})
            const orders = await orderModule.find()
            const pendingOrders = await orderModule.find({ 'status': 'pending' })
            res.send({message:'order status updated successfully',orders,pendingOrders})
        } catch (error) {
            res.status(500).send(error)
        }
    });

// Get pending orders 
router.post('/different-orders',
    checkLoginUser,
    checkRole.checkAdminOrSuperAdmin,
    async (req, res, next) => {
        try {
            const ordersType=req.body.ordersType
            // Find pending order from database 
            const differentOrders = await orderModule.find({ 'status': ordersType })
            res.status(200).json(differentOrders)
        } catch (error) {
            res.status(500).send(error)
        }
    });

module.exports = router;
