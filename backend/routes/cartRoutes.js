const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth');


const logRequest = (req, res, next) => {
  console.log("=== Incoming Cart Request ===");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
};

// Apply debug logger globally to all routes in this router
router.use(logRequest);

// GET all cart items
router.get('/', auth, cartController.getCart);

// POST add item to cart
router.post('/', auth, cartController.addItemToCart);

// PUT update item quantity
router.put('/:id', auth, cartController.updateItemQuantity);

router.delete('/:id', auth, cartController.removeFromCart); 

module.exports = router;
