const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel"); // Import Order model

exports.addToCart = async (req, res) => {
    try {
        const { productId } = req.body; // Fix variable name
        const product = await Product.findOne({ uid: productId });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const user = await User.findById(req.user._id); // Ensure we fetch the user from DB
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.cart.push(product._id); // Store product ID instead of whole object
        await user.save();

        res.status(200).json({ message: "Product added to cart" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.orders = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("orders"); // Fetch user's orders
        res.status(200).json({ orders: user.orders });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.cart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("cart"); // Populate cart items
        res.status(200).json({ cart: user.cart });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
