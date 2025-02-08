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
        if (!order.txn_id || !order.name || !order.items || !order.total) {
            return res.status(400).json({ message: 'Invalid order data' });
        }
        console.log(req)
        console.log(order);
        const parseData={
            uid:order.txn_id,
            user:order.name,
            products:order.items,
            total:order.total,
        }
        const newOrder = await Order.create(parseData);
        newOrder.save();
        res.status(201).json({ message: 'Order created', order: newOrder });
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