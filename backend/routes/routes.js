const express = require('express');
const router = express.Router();
const { products } = require('../controllers/controllers');
const { verifyToken, isAdmin } = require('../middlewares/auth');
const userRoutes = require('./users');
const adminRoutes = require('./admin');

// Public route
router.get('/products', products);

// Middleware applied to all routes after this
router.use(verifyToken);

// User routes (protected)
router.use('/user', userRoutes);

// Admin routes (extra protection)
router.use(isAdmin);
router.use('/admin', adminRoutes);

module.exports = router;
