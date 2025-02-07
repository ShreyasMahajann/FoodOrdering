const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const User = require('../models/userModel');

exports.addItem = async (req, res) => {
    try {
        const { name, price, description,image } = req.body;
        const pid = Math.random().toString(36).substr(2, 9);
        const product = new Product({pid, name, price, description,image });
        await product.save();
        res.status(201).json({ product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteItem = async (req, res) => {
    try {
        const { pid } = req.body;
        await Product.findOneAndDelete({ pid });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.orders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ orders });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



