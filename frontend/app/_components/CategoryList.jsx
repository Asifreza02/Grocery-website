'use client';
import React, { useEffect, useState } from 'react';
import { getCategory } from '../_utils/GlobalApi';
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
    return <p className="mt-10 text-gray-500 text-center">Loading categories...</p>;
  }

  if (!categoryList?.data?.length) {
    return <p className="mt-10 text-gray-500 text-center">No categories found</p>;
  }

  return (
    <div className="my-12 md:mx-8 px-2">
      <h2 className="text-black/80 font-bold text-2xl mb-6 text-center md:text-left">
        Shop by Category:
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
        {categoryList.data.map((category) => (
          <Link href={`/product-category/${category.name}`} key={category._id}>
            <div className="flex flex-col items-center justify-center gap-2 p-3
              border rounded-lg cursor-pointer group hover:bg-green-100 transition duration-200 ease-in-out
              min-w-[120px] min-h-[150px]">
              <img
                src={category.icon}
                alt={category.name}
                className="w-24 h-24 md:w-28 md:h-28 object-contain min-w-[80px] min-h-[80px]"
              />
              <h2 className="text-black/80 text-center group-hover:text-green-700 font-medium truncate">
                {category.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
