const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/MCart');

const productSchema = mongoose.Schema({
    category: String,
    sub_category: String,
    product_name: String,
    description: String,
    original_price: String,
    discounted_price: String,
    product_image: String,
    specifications: Array,
    reviews: Array
})

const productModel = mongoose.model('Products', productSchema);

module.exports = productModel;