'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [userAddress, setUserAddress] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      toast.error("You must be logged in to view cart");
      setLoading(false);
      return;
    }
    setToken(storedToken);
    fetchCart(storedToken);
    fetchUserProfile(storedToken);
  }, []);

  const fetchCart = async (authToken) => {
    try {
      const response = await fetch('/api/cart', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch cart');
      }

      const data = await response.json();
      setCartItems(data);
    } catch (err) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async (authToken) => {
    try {
      const response = await fetch('/api/user/profile', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.address) {
          setUserAddress(`${data.address}, ${data.city}, ${data.state} ${data.zip}`);
        }
      }
    } catch (error) {
      console.error("Failed to fetch user profile", error);
    }
  };


  const handleAuthError = (err) => {
    if (err.message.includes("Session expired") || err.message.includes("Unauthorized") || err.message.includes("jwt expired")) {
      localStorage.removeItem("token");
      toast.error("Session expired. Please log in again.");
      router.push('/sign-in');
      return;
    }
    console.error("Cart error:", err);
    toast.error("Failed to fetch cart");
  };


  const updateQuantity = async (item, delta) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) return;

    try {
      const response = await fetch(`/api/cart/${item._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity: newQuantity })
      });

      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }

      setCartItems(prev =>
        prev.map(i => i._id === item._id ? { ...i, quantity: newQuantity } : i)
      );
    } catch (err) {
      handleAuthError(err);
    }
  };

  // Remove item
  const removeItem = async (itemId) => {
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to remove item');
      }

      setCartItems(prev => prev.filter(i => i._id !== itemId));
      toast.success("Item removed from cart");
    } catch (err) {
      handleAuthError(err);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.product.sellingPrice,
    0
  );

  const shipping = subtotal > 500 ? 0 : 50; // Free shipping over 500
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (!userAddress) {
      toast.error("Please add a delivery address");
      router.push('/profile');
      return;
    }

    try {
      setLoading(true);
      const orderItems = cartItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.sellingPrice
      }));

      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: orderItems,
          totalAmount: total,
          address: userAddress
        })
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      // Dispatch cart update event to clear badge
      window.dispatchEvent(new Event('cart-update'));
      router.push('/order-confirmation');

    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!cartItems.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <ShoppingBag size={64} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
        <Button onClick={() => router.push('/')} className="bg-emerald-600 hover:bg-emerald-700 text-white">
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-12 bg-gray-50 dark:bg-zinc-900">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-gradient"
      >
        Shopping Cart
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-zinc-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-zinc-700 flex gap-4 items-center"
            >
              <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center p-2 shrink-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate pr-4">{item.product.name}</h3>
                <p className="text-emerald-600 font-bold">₹{item.product.sellingPrice}</p>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 dark:bg-zinc-900 rounded-lg p-1">
                <button
                  onClick={() => updateQuantity(item, -1)}
                  className="p-1 hover:bg-white rounded-md transition-colors disabled:opacity-50"
                  disabled={item.quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="font-medium w-4 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item, 1)}
                  className="p-1 hover:bg-white rounded-md transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={() => removeItem(item._id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors ml-2"
              >
                <Trash2 size={20} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-zinc-700 sticky top-24"
          >
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-emerald-600 font-medium">Free</span> : `₹${shipping}`}</span>
              </div>
              <div className="h-px bg-gray-100 dark:bg-zinc-700 my-2"></div>
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            {/* Address Section */}
            <div className="mb-6 bg-gray-50 dark:bg-zinc-900 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold flex items-center gap-2">
                  <MapPin size={16} className="text-emerald-600" />
                  Delivery Address
                </span>
                <Link href="/profile" className="text-xs text-emerald-600 hover:underline">
                  {userAddress ? 'Change' : 'Add'}
                </Link>
              </div>
              {userAddress ? (
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {userAddress}
                </p>
              ) : (
                <p className="text-xs text-red-500">
                  Please add a delivery address to proceed.
                </p>
              )}
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg rounded-xl shadow-emerald-200 shadow-lg"
              disabled={!userAddress || loading}
            >
              Place Order <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
