// routes/users.js
const admin = require('../controllers/adminControllers');
const router = require('express').Router();

router.get('/orders', admin.orders);
router.post('/add-item', admin.addItem);
router.post('/delete-item', admin.deleteItem);

module.exports = router;
