'use client';
import React, { useEffect, useState } from 'react';
import { getProducts, addToCart } from '../_utils/GlobalApi';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

const Products = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    try {
      const res = await getProducts();
      setProductList(res?.data || res || []);
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
      await addToCart(cartData, token);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center">
        <p>Loading products...</p>
      </div>
    );
  }

  if (!productList.length) {
    return <p className="mt-10 text-gray-500 text-center">No products available</p>;
  }

  return (
    <div className="my-12 px-4 md:px-8">
      <h2 className="text-black/80 font-bold text-2xl mb-6 text-center md:text-left">
        Our Popular Products:
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 auto-rows-fr">
        {productList.map((product, index) => {
          const id = product?._id || product?.id || index;
          const name = product?.attributes?.name ?? product?.name ?? 'Unnamed';
          const image =
            product?.attributes?.image?.data?.attributes?.url
              ? process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                product.attributes.image.data.attributes.url
              : product?.image;
          const mrp = product?.attributes?.mrp ?? product?.mrp ?? 0;
          const sellingPrice = product?.attributes?.sellingPrice ?? product?.sellingPrice ?? null;

          return (
            <div
              key={id}
              className="flex flex-col items-center justify-between gap-3 p-3 md:p-4
                         border rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-200
                         w-full min-h-[260px] bg-white"
            >
              <div className="w-full flex-1 flex items-center justify-center">
                <img
                  src={image}
                  alt={name}
                  className="max-h-[140px] object-contain"
                />
              </div>
              <h2 className="font-bold text-lg text-center truncate w-full">{name}</h2>

              <div className="flex gap-2 justify-center items-center">
                {sellingPrice && <span className="font-bold text-lg">${sellingPrice}</span>}
                <span
                  className={`font-bold text-lg ${
                    sellingPrice ? 'line-through text-gray-500' : ''
                  }`}
                >
                  ${mrp}
                </span>
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                className="w-full flex items-center justify-center gap-2
                           border p-2 rounded-lg bg-green-50 text-green-700
                           hover:text-white hover:bg-green-500 hover:border-green-700 transition duration-200"
              >
                <Plus size={16} /> Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
