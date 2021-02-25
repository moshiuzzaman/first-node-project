const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/first-project', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

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