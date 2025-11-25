'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Eye, Star, Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ProductItem = ({ product, index = 0 }) => {
    const id = product?._id || product?.id || index;
    const name = product?.name || 'Unnamed';
    const image = product?.image;
    const mrp = product?.mrp || 0;
    const sellingPrice = product?.sellingPrice || 0;
    const description = product?.description || 'No description available';
    const weight = product?.weight || '1 kg';
    const rating = product?.rating || 4.5;
    const reviews = product?.reviewsCount || 120;

    const [isFavorite, setIsFavorite] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        checkIfFavorite();
    }, [product]);

    const checkIfFavorite = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            const response = await fetch('/api/favorites', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const favorites = await response.json();
                const isFav = favorites.some(fav => fav._id === (product._id || product.id));
                setIsFavorite(isFav);
            }
        } catch (error) {
            console.error("Error checking favorites:", error);
        }
    };

    const toggleFavorite = async (e) => {
        e.stopPropagation();
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to manage favorites');
            return;
        }
        try {
            const method = isFavorite ? 'DELETE' : 'POST';
            const response = await fetch('/api/favorites', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ productId: product._id || product.id })
            });

            if (response.ok) {
                setIsFavorite(!isFavorite);
                toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
            } else {
                toast.error('Failed to update favorites');
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
            toast.error('Something went wrong');
        }
    };

    const handleAddToCart = async (e) => {
        e.stopPropagation(); // Prevent parent clicks if any
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please login first to add items to cart');
                return;
            }

            const productId = product._id || product.id;
            if (!productId) {
                toast.error('Unable to add this product to cart');
                return;
            }

            setIsAdding(true); // Start animation immediately

            const cartData = { productId, quantity: 1 };
            await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(cartData),
            });
            toast.success(`${name} added to cart!`);
            window.dispatchEvent(new Event('cart-update'));
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error('Failed to add to cart. Please try again.');
        } finally {
            setTimeout(() => setIsAdding(false), 500); // Reset after a short delay
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 dark:border-zinc-800 transition-all duration-300 flex flex-col"
        >
            {/* Image Section */}
            <div className="relative h-48 sm:h-56 bg-gray-50 dark:bg-zinc-800 p-4 flex items-center justify-center overflow-hidden">
                <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    src={image}
                    alt={name}
                    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                />

                {/* Overlay Actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
                    <button
                        onClick={toggleFavorite}
                        className={`p-2 rounded-full shadow-md transition-colors ${isFavorite ? 'bg-red-50 text-red-500' : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'}`}
                    >
                        <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 transition-colors">
                        <Eye size={16} />
                    </button>
                </div>

                {product.isBestSeller && (
                    <div className="absolute top-3 left-3 bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                        Best Seller
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-1">
                    <div className="text-[10px] text-emerald-600 font-semibold uppercase tracking-wider">{product?.category?.name || 'Grocery'}</div>
                    <div className="flex items-center gap-1 text-yellow-500 text-[10px] font-medium">
                        <Star size={10} fill="currentColor" />
                        <span>{rating}</span>
                        <span className="text-gray-400">({reviews})</span>
                    </div>
                </div>

                <h3 className="text-base font-bold text-gray-800 dark:text-white mb-1 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                    {name}
                </h3>

                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-2 min-h-[32px]">
                    {description}
                </p>

                <div className="text-xs text-gray-400 mb-3 font-medium">
                    {weight}
                </div>

                <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-gray-400 text-xs line-through">₹{mrp}</span>
                        <span className="text-lg font-bold text-emerald-600">₹{sellingPrice}</span>
                    </div>

                    <Button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className={`rounded-full w-8 h-8 p-0 shadow-none hover:shadow-lg transition-all duration-300 ${isAdding ? 'bg-emerald-600 text-white scale-110' : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-white'}`}
                    >
                        {isAdding ? (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <Plus size={18} className="animate-spin" />
                            </motion.div>
                        ) : (
                            <Plus size={18} />
                        )}
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductItem;
