// routes/users.js
const user = require('../controllers/user');

// Define a route
router.post('/add-to-cart', user.addItem);
router.get('/order', user.orders);
router.get('/cart', user.cart);
// export the router module so that server.js file can use it
module.exports = router;