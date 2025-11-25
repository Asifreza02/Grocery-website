'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategoryList = async () => {
    try {
      const response = await fetch('/api/categories');
      const res = await response.json();
      setCategoryList(res);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategoryList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!categoryList?.data?.length) {
    return <p className="mt-10 text-gray-500 text-center">No categories found</p>;
  }

  return (
    <div className="w-full py-16">
      <div className="flex items-center justify-between mb-8 px-4 md:px-0">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold text-gradient"
        >
          Shop by Category
        </motion.h2>
        <Link href="/categories" className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium transition-colors">
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4 md:px-0">
        {categoryList.data.map((category, index) => (
          <Link href={`/product-category/${category.name}`} key={category._id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl glassmorphism hover:shadow-2xl transition-all duration-300 overflow-hidden h-full"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-white/50 dark:bg-black/20 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-center font-semibold text-foreground group-hover:text-emerald-600 transition-colors duration-200 text-sm md:text-base">
                  {category.name}
                </h3>
              </div>

              {/* Animated arrow on hover */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-4 h-4 text-emerald-600" />
              </motion.div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
