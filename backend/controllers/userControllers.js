import User from '../models/userModel';
import Product from '../models/productModel';


exports.addToCart = async (req, res) => {
    try {
        const { pid } = req.body;
        const product = await Product.findOne({ uid: pid });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const {user} = req;
        user.cart.push(product);
        await user.save();
        res.status(200).json({ message: 'Product added to cart' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.orders = async (req, res) => {
    try {
        const {user} = req;
        const orders = await Order.find({ user: user._id });
        res.status(200).json({ orders });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.cart = async (req, res) => {
    try {
        const {user} = req;
        const {cart} = user;
        res.status(200).json({ cart });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
