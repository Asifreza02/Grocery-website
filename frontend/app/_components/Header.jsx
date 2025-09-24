'use client'
import { Globe, LayoutGrid, Search, ShoppingBag, UserIcon } from 'lucide-react'
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { getCategory } from '../_utils/GlobalApi';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const Header = () => {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);


  const getCategoryList = async () => {
    try {
      const res = await getCategory();
      setCategoryList(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


  const onLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    toast.success("Logout successful");
    router.push('/sign-in');
  };

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
    getCategoryList();
  }, []);

  return (
    <div className='flex justify-between p-4 md:px-12 bg-slate-500 shadow-lg'>
      <div className='flex gap-6 md:gap-12 items-center'>
        <img
          src="./grocery-store-logo.jpg"
          alt="logo"
          className='w-18 h-10 object-contain'
        />
        <h2 onClick={() => router.push('/')} className='md:flex hidden p-2 gap-1 items-center  cursor-pointer'>
          <Globe size={28} />
          Home
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className='flex items-center gap-2 border rounded-full p-2 px-4 bg-slate-200 cursor-pointer'>
              <LayoutGrid className='h-5 w-5' />
              Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryList.map((category, index) => {
              const name = category.name ?? "Unnamed";
              const iconUrl =
                process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                (category?.attributes?.icon?.data?.attributes?.url ?? "");

              return (
                <Link key={index} href={'/product-category/' + name}>
                  <DropdownMenuItem className="cursor-pointer">
                    <img
                      src={category.icon ? category.icon : iconUrl}
                      alt={category.name}
                      className='w-8 h-8 object-contain'
                    />
                    <h2>{category.name}</h2>
                  </DropdownMenuItem>
                </Link>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className='md:flex hidden p-2 gap-1 items-center border border-gray-800 rounded-full'>
          <Search className='h-5 w-5' />
          <input
            type="text"
            placeholder='Search'
            className='outline-none bg-transparent'
          />
        </div>
      </div>

      {/* Right side */}
      <div className='flex items-center gap-6'>
  <h2
    className='flex items-center cursor-pointer'
    onClick={() => router.push('/cart')}
  >
    <ShoppingBag />
    Cart
  </h2>
        {!isLogin ? (
          <Link href='/sign-in'>
            <Button>Login</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <UserIcon className='size-8 cursor-pointer' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='cursor-pointer'>Profile</DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer'>Orders</DropdownMenuItem>
              <DropdownMenuItem
                onClick={onLogout}
                className="text-red-500 cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  )
}

export default Header;
