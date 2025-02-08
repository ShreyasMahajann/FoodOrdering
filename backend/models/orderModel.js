const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: [false, 'An order must have an id'],
    },
    user: {
        type: String,
        ref: 'User',
        required: [true, 'An order must have a user'],
    },
    products: {
        type: [String],
        required: [true, 'An order must have products'],
    },
    total: {
        type: Number,
        required: [true, 'An order must have a total'],
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
    },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;