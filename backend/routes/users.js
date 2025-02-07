const express = require('express');
const router = express.Router();
const user = require('../controllers/userControllers');

// Define a route
router.post('/add-to-cart', user.addToCart);
router.get('/order', user.orders);
router.get('/cart', user.cart);
// export the router module so that server.js file can use it
module.exports = router;