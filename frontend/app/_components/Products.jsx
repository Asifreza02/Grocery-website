'use client';
import React, { useEffect, useState } from 'react';
import { Plus, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Products = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const res = await response.json();
      setProductList(res?.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleAddToCart = async (product) => {
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

      const cartData = { productId, quantity: 1 };
      await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(cartData),
      });
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!productList.length) {
    return <p className="mt-10 text-gray-500 text-center">No products available</p>;
  }

  return (
    <div className="w-full my-12 px-4 md:px-0">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-center md:text-left text-gradient"
      >
        Our Popular Products
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productList.map((product, index) => {
          const id = product?._id || product?.id || index;
          const name = product?.attributes?.name ?? product?.name ?? 'Unnamed';
          const image = product?.image;
          const mrp = product?.attributes?.mrp ?? product?.mrp ?? 0;
          const sellingPrice = product?.attributes?.sellingPrice ?? product?.sellingPrice ?? null;

          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -10 }}
              className="group relative flex flex-col justify-between p-4 rounded-2xl glassmorphism hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl bg-white/50 flex items-center justify-center">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  src={image}
                  alt={name}
                  className="h-full object-contain p-4"
                />

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ scale: 1.1 }}
                  className="absolute bottom-4 right-4 bg-emerald-500 text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart size={20} />
                </motion.button>
              </div>

              <div className="space-y-2">
                <h2 className="font-bold text-lg truncate text-foreground">{name}</h2>

                <div className="flex items-baseline gap-2">
                  {sellingPrice && (
                    <span className="font-bold text-xl text-emerald-600">₹{sellingPrice}</span>
                  )}
                  <span className={`text-sm ${sellingPrice ? 'line-through text-muted-foreground' : 'font-bold text-xl text-emerald-600'}`}>
                    ₹{mrp}
                  </span>
                </div>
                {/* Visible Add to Cart button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-2 w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
