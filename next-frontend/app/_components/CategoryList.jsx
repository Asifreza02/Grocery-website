'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { getCategory } from '../_utils/GlobalApi'
import Link from 'next/link';

const CategoryList = () => {
  
    const [categoryList, setCategoryList] = useState([]);
    const getCategoryList = async () => { 
      try {
        const res = await getCategory();
        setCategoryList(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        
      }
    };
  
    useEffect(() => {
      getCategoryList(); 
    }, []);
  return (
    <div>
    <h1 className='text-green-900 font-bold text-2xl mx-2 md:mx-10'>Category List: </h1>
    <div className='flex justify-center items-center gap-2 md:gap-6 my-2'>
        {categoryList.map((category, index)=>(
      <div key={index} className=' w-16 h-16 md:w-36 md:h-36 flex flex-col items-center justify-center hover:scale-110 transition-all ease-in-out  hover:bg-blue-200 cursor-pointer '>
        <Link href={'product-category/'+ category.attributes.name}>
        <img src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+
            category.attributes?.icon?.data?.attributes?.url} className='w-14 h-12 md:w-28 md:h-28 object-cover p-2 '/>
          <h2>{category.attributes.name}</h2>
        </Link>  
          </div>
        )
        )}
    </div>
    </div>
  )
}

export default CategoryList
