const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/first-project', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const orderSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    date:{
        type: Date,
        default: Date.now
    },
})
const orderModel = mongoose.model('orders', orderSchema);
module.exports=orderModel;