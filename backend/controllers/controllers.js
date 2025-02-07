const Product = require('../models/productModel');

exports.products = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}