const express = require('express');
const router = express.Router();
const admin = require('../controllers/adminControllers');

router.get('/orders', admin.orders);
router.post('/add-item', admin.addItem);
router.post('/delete-item', admin.deleteItem);

module.exports = router;
