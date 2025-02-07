const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name'],
    },
    email: {
        type: String,
        required: [true, 'A user must have an email'],
    },
    // password: {
    //     type: String,
    //     required: [true, 'A user must have a password'],
    // },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    cart: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
        },
    ],
    orders: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Order',
        },
    ],
});

const User = mongoose.model('User', userSchema);
module.exports = User;