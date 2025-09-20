'use client'
import React, { useEffect, useState } from 'react'
import { getProducts } from '../_utils/GlobalApi'
import { Plus } from 'lucide-react';


const Products = () => {

    const [productList, setProductList] = useState([]);

    const getAllProducts = async () =>{
        try {
            const res = await getProducts();
            setProductList(res);
          } catch (error) {
            console.error("Error fetching products:", error);
          }
    };


    useEffect(() => {
        getAllProducts();
    }, []);
  return (
    <div className='mt-10'>
        <h2 className="text-green-600 font-bold text-2xl">Our Popular Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {productList.map((product, index) =>(
                <div key={index} className="p-2 md:p-6 flex flex-col items-center justify-center gap-3 
                border rounded-lg hover:scale-105 hover:shadow-lg transition-all ease-in-out cursor-pointer">
                    <img src={product.image} alt={product.name}
                        className="w-full h-[120px] object-contain"
                    />
                    <h2 className="font-bold text-lg">{product.name}</h2>
                    <div className="flex gap-3">
                        {product.sellingPrice&&<h2 className="font-bold text-lg">${product.sellingPrice}</h2>}
                        <h2 className={`font-bold text-lg ${product.sellingPrice && `line-through text-gray-500`}`}>
                            ${product.mrp}
                        </h2>
                    </div>
                    <div className="border p-2 rounded-lg bg-green-50 text-green-700 
                        hover:text-white hover:bg-green-500 hover:border-green-700 w-full">
                        <Plus/>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Products