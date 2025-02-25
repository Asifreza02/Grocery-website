'use client'

import React, { useEffect, useState } from 'react'
import { getProducts } from '../_utils/GlobalApi'
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation';
import { handleAddToCart } from '../_utils/GlobalApi';
import { toast } from 'sonner';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  // Safer sessionStorage access with optional chaining
  const jwt = typeof window !== 'undefined' ? sessionStorage.getItem('jwt') : null;
  const user = typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem('user') || null) : null;

  const getProductList = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const addToCart = async (product) => {
    if (!jwt) {
      router.push('/sign-in');
      return;
    }

    try {
      const amount = product.attributes?.sellingPrice 
        ? product.attributes.sellingPrice * quantity 
        : product.attributes?.mrp * quantity;

      const data = {
        data: {
          quantity: quantity,
          amount: amount,
          products: product.id,
          users_permissions_user: user?.id
        }
      };

      // Add await for proper async handling
      const res = await handleAddToCart(data);
      console.log(res);
      toast.success('Added to cart');
      setQuantity(1); // Reset quantity after adding to cart
    } catch (err) {
      toast.error('Error while adding to cart');
      console.error('Error in add to cart:', err);
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div>
      <h1 className="text-green-900 font-bold text-2xl mb-4">Popular Products:</h1>
      <div className="grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
        {products.slice(0, 9).map((product, index) => (
          <div key={product.id || index} className="bg-slate-500 min-h-48 sm:max-w-72 md:max-w-96 p-2 rounded-lg flex gap-3 md:gap-6 shadow-md">
            <img
              src={
                process.env.NEXT_PUBLIC_BACKEND_BASE_URL // Fixed typo in environment variable
                  ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product.attributes?.image?.data?.attributes?.url}`
                  : product.attributes?.image?.data?.attributes?.url || '/placeholder.png'
              }
              alt={product.attributes?.name || 'Product Image'}
              className="w-20 h-20 md:w-28 md:h-28 object-cover p-2 hover:scale-110 transition-all ease-in-out duration-500 cursor-pointer"
            />
            <div className='flex flex-col justify-between'>
              <h2 className="text-white font-semibold mt-2 md:text-lg flex gap-2">
                <span>{product.attributes?.name}</span>
                <span className="text-gray-300">({product.attributes?.itemQuantityType})</span>
              </h2>
              <p className="text-gray-200 text-sm">{product.attributes?.description}</p>

              <div>
                <p className="text-gray-100 text-sm m-2">
                  Price:
                  <span className={`${product.attributes?.sellingPrice && 'line-through text-gray-300'}`}>
                    ₹{product.attributes?.mrp || 'N/A'}
                  </span>
                  {product.attributes?.sellingPrice && 
                    <span className="ml-2">₹{product.attributes?.sellingPrice}</span>}
                </p>

                <Dialog>
                  <DialogTrigger className="w-20 md:w-24 h-10 border bg-slate-400 rounded-lg hover:bg-gray-800 hover:scale-105 transition-all ease-in-out">
                    Add to Cart
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you ready to add this item?</DialogTitle>
                      <DialogDescription>
                        <div className='flex justify-between gap-4 mx-10'>
                          <div className='max-w-40'>
                            <img
                              src={
                                process.env.NEXT_PUBLIC_BACKEND_BASE_URL // Fixed typo here
                                  ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product.attributes?.image?.data?.attributes?.url}`
                                  : product.attributes?.image?.data?.attributes?.url || '/placeholder.png'
                              }
                              alt={product.attributes?.name || 'Product Image'}
                              className="w-36 h-36 object-cover p-2 hover:scale-110 transition-all ease-in-out duration-500 cursor-pointer"
                            />
                            <p className="text-sm text-gray-600">{product.attributes?.description}</p>
                          </div>
                          <div className='flex flex-col items-center justify-center'>
                            <h2 className='font-bold text-xl text-black'>
                              {product.attributes?.name} 
                              <span className='text-gray-600'> ({product.attributes?.itemQuantityType})</span>
                            </h2>

                            <div className="text-black mt-4 font-semibold">
                              Total: ₹
                              {product.attributes?.sellingPrice 
                                ? product.attributes.sellingPrice * quantity 
                                : product.attributes?.mrp * quantity}
                            </div>
                            <div className='flex gap-6 items-center justify-center my-2 bg-slate-200 rounded-lg'>
                              <Button 
                                className='bg-black rounded-lg text-white px-2 py-1'
                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                              >
                                -
                              </Button>
                              <span className='text-black font-bold'>{quantity}</span>
                              <Button 
                                className='bg-black rounded-lg px-2 py-1 text-white'
                                onClick={() => setQuantity(prev => prev + 1)}
                              >
                                +
                              </Button>
                            </div>
                            <Button 
                              className="w-20 md:w-24 h-10 mt-4 hover:bg-gray-800 hover:scale-105 transition-all ease-in-out"
                              onClick={() => addToCart(product)}
                            >
                              Add to Cart
                            </Button>
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
  );
}

export default Products;