'use client';
import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import ShinyText from '@/app/_components/ShinyText';
import ProductItem from '@/app/_components/ProductItem';

const ProductCategory = ({ params }) => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Unwrap params
        const unwrappedParams = await params;
        const category = unwrappedParams.categoryName;
        setCategoryName(category);

        console.log('Fetching products for category:', category);
        const response = await fetch('/api/products?category=' + encodeURIComponent(category));
        const res = await response.json();
        console.log('API Response:', res);
        console.log('Products data:', res?.data);
        const products = res?.data || [];
        console.log('Setting product list:', products);
        setProductList(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [params]);

  // Add product to cart
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

      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cartData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add to cart');
      }

      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error(error.message || 'Failed to add to cart. Please try again.');
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
    return (
      <p className="mt-10 text-gray-500 text-center">
        No products available in {categoryName}
      </p>
    );
  }

  return (
    <div className="my-12 px-4 md:px-14">
      <ShinyText
        text={categoryName}
        className="text-3xl font-bold mb-8 text-center md:text-left"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {productList.map((product, index) => (
          <ProductItem key={product._id || index} product={product} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;
