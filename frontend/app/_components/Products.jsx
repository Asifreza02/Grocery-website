'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import ShinyText from './ShinyText';
import ProductItem from './ProductItem';

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
    <div className="w-full my-16 px-4 md:px-12">
      <ShinyText
        text="Our Popular Products"
        className="text-4xl font-bold mb-12 text-center md:text-left"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {productList.map((product, index) => (
          <ProductItem key={product._id || index} product={product} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Products;
