const Product = require('../models/productModel');
const Order = require('../models/orderModel');

exports.products = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.order = async (req, res) => {
    try {
        const order = req.body;
        const newOrder = await Order.create(order);
        newOrder.save();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ orders });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteOrder = async (req, res) => {
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'Order deleted' });
    }catch(error){
        res.status(400).json({ message: error.message });
    }
}