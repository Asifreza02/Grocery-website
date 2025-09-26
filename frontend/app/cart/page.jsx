'use client';

import { useEffect, useState } from 'react';
import { getCartItems, updateCartItemQuantity, removeFromCart } from '../_utils/GlobalApi';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

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
  }, []);

  const fetchCart = async (authToken) => {
    try {
      const data = await getCartItems(authToken);
      setCartItems(data);
    } catch (err) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };


  const handleAuthError = (err) => {
    if (err.message.includes("Session expired") || err.message.includes("Unauthorized")) {
      localStorage.removeItem("token");
      toast.error(err.message);
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
      await updateCartItemQuantity(item._id, newQuantity, token);
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
      await removeFromCart(itemId, token);
      setCartItems(prev => prev.filter(i => i._id !== itemId));
      toast.success("Item removed from cart");
    } catch (err) {
      handleAuthError(err);
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.product.sellingPrice,
    0
  );

  if (loading) return <p>Loading cart...</p>;
  if (!cartItems.length) return <p>Your cart is empty</p>;

  return (
    <div className="cart-container p-4 md:p-8">
      {cartItems.map(item => (
        <div key={item._id} className="cart-item flex gap-4 p-4 border-b items-center">
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-20 h-20 object-contain"
          />
          <div className="flex-1 md:mx-14">
            <h2 className="text-lg font-semibold">{item.product.name}</h2>
            <p>Price: ₹{item.product.sellingPrice}</p>
            <div className="flex items-center gap-2 mt-2">
              <button onClick={() => updateQuantity(item, -1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item, 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
              <button onClick={() => removeItem(item._id)} className="ml-4 p-2 md:ml-12 text-black-500 font-semibold border bg-red-600 fill rounded-md">Remove</button>
            </div>
          </div>
        </div>
      ))}
      <div className="cart-total flex flex-col mt-4 items-end text-xl font-bold">Total: ₹{totalPrice}
      <Button onClick={() => router.push('/checkout')} className="mt-4 w-40 bg-green-600 text-white px-6 py-2 rounded">Proceed to Checkout</Button>
      </div>
      
    </div>
  );
};

export default Cart;
