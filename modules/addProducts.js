const mongoose = require('mongoose');

// define products Schema
const productsSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
})
const productsModel = mongoose.model('products', productsSchema);
module.exports=productsModel;