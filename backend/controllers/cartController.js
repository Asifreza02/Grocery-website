
const Cart = require('../models/Cart');

// Get user's cart
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Add item to cart
exports.addItemToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        let cart = await Cart.findOne({ user: userId });

        if (cart) {
            // Cart exists, update it
            const itemIndex = cart.items.findIndex(p => p.product == productId);

            if (itemIndex > -1) {
                // Product exists in the cart, update the quantity
                let productItem = cart.items[itemIndex];
                productItem.quantity += quantity;
                cart.items[itemIndex] = productItem;
            } else {
                // Product does not exist in cart, add new item
                cart.items.push({ product: productId, quantity });
            }
            cart = await cart.save();
            return res.status(201).send(cart);
        } else {
            // No cart for user, create new cart
            const newCart = await Cart.create({
                user: userId,
                items: [{ product: productId, quantity }]
            });
            return res.status(201).send(newCart);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
