'use client'
import React, { useEffect, useState } from 'react'
import { getCartItems, removeFromCart, updateCartItem } from '../../_utils/GlobalApi'
import { Trash2, Plus, Minus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CartItemsPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();   
    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please login to view cart items.");
                router.push('/login');
                return;
            }   
            const res = await getCartItems(token);
            setCartItems(res || []);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Cart Items</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CartItemsPage;