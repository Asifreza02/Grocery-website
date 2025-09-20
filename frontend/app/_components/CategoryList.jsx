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
      setCategoryList(res?.data || []); // Strapi: res.data
    } catch (error) {
      console.error("Error fetching categories:", error);
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
      <h2 className="text-green-600 font-bold text-2xl">Shop by Category</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 mt-2">
        {categoryList.map((category, index) => {
          const id = category?.id || category?._id || index; // ✅ Always unique
          const name = category?.attributes?.name ?? "Unnamed";
          const imageUrl =
            process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
            (category?.attributes?.icon?.data?.attributes?.url ?? "");

          return (
            <Link href={`/product-category/${name}`} key={id}>
              <div className="flex flex-col items-center justify-center gap-2 p-3 
                border rounded-lg cursor-pointer group hover:bg-green-200">
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-20 h-20 object-cover"
                />
                <h2 className="text-green-800 group-hover:text-white">{name}</h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
