const mongoose = require('mongoose');

// define order Schema
const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index:true
    },
    name: {
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    mobile:{
        type:Number,
        require:true
    },
    orderedProducts: {
        type: [],
        required: true,
    },
    total:{
        type:Number,
        require:true
    },
    comment:{
        type:String
    },
    status: {
        type: String,
        default: 'pending',
        index: true,
    },
    date: {
        type: Date,
        default: Date.now,
        index: true,
    },
})

const orderModel = mongoose.model('orders', orderSchema);
module.exports = orderModel;