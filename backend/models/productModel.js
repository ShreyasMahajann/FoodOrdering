const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    pid: {
        type: String,
        required: [true, 'A product must have an id'],
    },
    name: {
        type: String,
        required: [true, 'A product must have a name'],
    },
    price: {
        type: Number,
        required: [true, 'A product must have a price'],
    },
    description: {
        type: String,
        required: [true, 'A product must have a description'],
    },
    image: {
        type: String,
        required: [true, 'A product must have an image'],
    },
    // stock: {
    //     type: Number,
    //     required: [true, 'A product must have a stock'],
    // },
    });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

