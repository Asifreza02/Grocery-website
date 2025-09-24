const Cart = require('../models/Cart');

const getCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    const cartItems = await Cart.find({ user: userId }).populate('product');
    res.status(200).json(cartItems);
  } catch (err) {
    console.error("Get cart error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user?.id;

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    let cartItem = await Cart.findOne({ user: userId, product: productId });

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = new Cart({ user: userId, product: productId, quantity });
    }

    await cartItem.save();
    res.status(200).json(cartItem);
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateItemQuantity = async (req, res) => {
  const userId = req.user.id;
  const cartItemId = req.params.id;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  try {
    const cartItem = await Cart.findOne({ _id: cartItemId, user: userId });
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

    cartItem.quantity = quantity;
    await cartItem.save();

    res.json({ message: "Quantity updated", item: cartItem });
  } catch (err) {
    console.error("Error updating cart item quantity:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const cartItemId = req.params.id;

  try {
    const cartItem = await Cart.findOne({ _id: cartItemId, user: userId });
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await Cart.deleteOne({ _id: cartItemId });

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("Error removing cart item:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Export all functions together
module.exports = {
  getCart,
  addItemToCart,
  updateItemQuantity,
  removeFromCart
};
