'use client'
import React, { useEffect, useState } from 'react'
import { getProductsByCategory } from '@/app/_utils/GlobalApi'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const productCategory = ({}) => {
  const params = useParams();
  console.log("Category Name:", params.categoryName);
 
  const [categoryProducts, setCategoryProducts] = useState([]);

  const productsByCategory = async () => {
    try {
      const res = await getProductsByCategory(params.categoryName);
      setCategoryProducts(res.data);    
    }
    catch (err) {
      console.log('Error fetching products by category', err)
    }
  };

   useEffect(()=>{
    productsByCategory();
   },[]);

   const [quantity, setQuantity] = useState(1);

  return (
      <div >
      <div className="bg-green-900  text-white font-bold h-20 text-2xl m-10 flex items-center justify-center">{params.categoryName}</div>

      <div className="grid justify-center mx-8 md:mx-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 ">
        {categoryProducts.map((product, index) => index < 6 && (
          <div key={index} className="bg-slate-500 min-h-48 sm:max-w-72 md:max-w-96 p-2 rounded-lg flex gap-3 md:gap-6 shadow-md ">
            {console.log(product)}
            <img
              src={
                process.env.NEXT_PUBLIC_BAKEND_BASE_URL
                  ? process.env.NEXT_PUBLIC_BAKEND_BASE_URL + product.attributes?.image?.data?.attributes?.url
                  : product.attributes?.image?.data?.attributes?.url || '/placeholder.png'
              }
              alt={product.attributes?.name || 'Product Image'}
              className="w-20 h-20 md:w-28 md:h-28 object-cover p-2 hover:scale-110 transition-all ease-in-out duration-500 cursor-pointer"
            />
            <div className=' flex flex-col justify-between'>
              <h2 className="text-white font-semibold mt-2 md:text-lg flex gap-2">
                <span>{product.attributes?.name}</span>
                <span className="text-gray-300">({product.attributes?.itemQuantityType})</span>
              </h2>
              <p>{product.attributes?.description || ''}</p>

              <div>
                <p className="text-gray-100 text-sm m-2">
                  Price:
                  <span className={`${product.attributes?.sellingPrice && 'line-through text-gray-300'}`}> ₹{product.attributes?.mrp || 'N/A'}</span>
                  {product.attributes?.sellingPrice && <span> ₹{product.attributes?.sellingPrice}</span>}
                </p>

                <Dialog>
                  <DialogTrigger>
                    <Button className="w-20 md:w-24 h-10 hover:bg-gray-800 hover:scale-105 transition-all ease-in-out">Add to Cart</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you ready to add this item?</DialogTitle>
                      <DialogDescription>
                        <div className='flex justify-between gap-4 mx-10'>
                          <div className=' max-w-40'>
                            <img
                              src={
                                process.env.NEXT_PUBLIC_BAKEND_BASE_URL
                                  ? process.env.NEXT_PUBLIC_BAKEND_BASE_URL + product.attributes?.image?.data?.attributes?.url
                                  : product.attributes?.image?.data?.attributes?.url || '/placeholder.png'
                              }
                              alt={product.attributes?.name || 'Product Image'}
                              className="w-36 h-36 object-cover p-2 hover:scale-110 transition-all ease-in-out duration-500 cursor-pointer"
                            />
                            <p>{product.attributes?.description}</p>
                          </div>
                          <div className='flex flex-col items-center justify-center'>
                            <h2 className='font-bold text-black'>{product.attributes?.name} (<span className='text-gray-600'>{product.attributes?.itemQuantityType})</span></h2>

                            <div className="text-black mt-4 font-semibold">
                              Total:
                              <span>
                                ₹{product.attributes?.sellingPrice
                                  ? product.attributes.sellingPrice * quantity
                                  : product.attributes?.mrp * quantity || "N/A"}
                              </span>
                            </div>
                            <div className='flex gap-6 items-center justify-center my-2 bg-slate-200 rounded-lg'>
                              <span>
                                <Button className='bg-black rounded-lg text-white px-2 py-1' onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : prev))}>-</Button>
                              </span>
                              <span className='text-black font-bold'>{quantity}</span>
                              <span>
                                <Button className='bg-black rounded-lg px-2 py-1 text-white' onClick={() => setQuantity(prev => prev + 1)}>+</Button>
                              </span>
                            </div>
                            <Button className="w-20 md:w-24 h-10 mt-4 hover:bg-gray-800 hover:scale-105 transition-all ease-in-out">Add to Cart</Button>
                          </div>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default productCategory
