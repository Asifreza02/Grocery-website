'use client'

import React, { useEffect, useState } from 'react'
import { getProducts, addToCart } from '../_utils/GlobalApi'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'

const Products = () => {
  const [productList, setProductList] = useState([])
  const [loading, setLoading] = useState(true)

  const getAllProducts = async () => {
    try {
      const res = await getProducts()
      setProductList(res?.data || res || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  const handleAddToCart = async (product) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        toast.error('Please login first to add items to cart')
        return
      }

      const productId = product._id || product.id
      if (!productId) {
        console.error('Product ID missing for:', product)
        toast.error('Unable to add this product to cart')
        return
      }

      const cartData = { productId, quantity: 1 }

      const res = await addToCart(cartData, token)
      console.log('Added to cart:', res)
      toast.success(`${product.name} added to cart!`)
    } catch (error) {
      console.error('Error adding to cart:', error?.response?.data || error)
      toast.error('Failed to add to cart. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center">
        <p>Loading products...</p>
      </div>
    )
  }

  return (
    <div className="my-20 md:mx-10">
      <h2 className="text-black-600 font-bold text-2xl my-8">Our Popular Products :</h2>
      <div className="grid min-w-80 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 mt-2 ">
        {productList.map((product, index) => {
          const id = product?._id || product?.id || index
          const name = product?.attributes?.name ?? product?.name ?? 'Unnamed'
          const image =
            product?.attributes?.image?.data?.attributes?.url
              ? process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                product.attributes.image.data.attributes.url
              : product?.image
          const mrp = product?.attributes?.mrp ?? product?.mrp ?? 0
          const sellingPrice =
            product?.attributes?.sellingPrice ?? product?.sellingPrice ?? null

          return (
            <div
              key={id}
              className="p-2 md:p-6 flex flex-col items-center justify-center gap-3 
                         border rounded-lg hover:scale-105 hover:shadow-lg transition-all ease-in-out min-w-40"
            >
              <img src={image} alt={name} className="w-full h-[120px] object-contain" />
              <h2 className="font-bold text-lg">{name}</h2>

              <div className="flex gap-3">
                {sellingPrice && <h2 className="font-bold text-lg">${sellingPrice}</h2>}
                <h2
                  className={`font-bold text-lg ${sellingPrice ? 'line-through text-gray-500' : ''}`}
                >
                  ${mrp}
                </h2>
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                className="border p-2 rounded-lg bg-green-50 text-green-700 
                           hover:text-white hover:bg-green-500 hover:border-green-700 
                           w-full flex items-center justify-center"
              >
                <Plus />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Products
