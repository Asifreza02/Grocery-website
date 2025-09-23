'use client'
import React, { useEffect, useState } from 'react'
import { getCategory } from '../_utils/GlobalApi'
import Link from 'next/link';

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategoryList = async () => {
    try {
      const res = await getCategory();
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
    return <p className="mt-10 text-gray-500">Loading categories...</p>;
  }


  return (
    <div className="mt-10">
      <h2 className="text-black-600 font-bold text-2xl">Shop by Category</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 mt-2">
        {categoryList.data.map((category) => (
          <Link href={`/product-category/${category.name}`} key={category._id}>
            <div className="flex flex-col items-center justify-center gap-2 p-3 
              border rounded-lg cursor-pointer group hover:bg-green-200">
              <img
                src={category.icon}
                alt={category.name}
                className="w-20 h-20 object-cover"
              />
              <h2 className="text-green-800 group-hover:text-white">{category.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
