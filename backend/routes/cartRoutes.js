
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth');

// @route   GET api/cart
// @desc    Get user cart
// @access  Private
router.get('/', auth, cartController.getCart);

// @route   POST api/cart
// @desc    Add item to cart
// @access  Private
router.post('/', auth, cartController.addItemToCart);

module.exports = router;
