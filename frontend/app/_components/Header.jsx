'use client'
import { Globe, LayoutGrid, Search, ShoppingBag, UserIcon, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
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
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getCategoryList = async () => {
    try {
      const response = await fetch('/api/categories');
      const res = await response.json();
      setCategoryList(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    window.dispatchEvent(new Event('auth-change'));
    toast.success("Logout successful");
    router.push('/sign-in');
  };

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLogin(!!token);
    };

    checkAuth();
    getCategoryList();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('auth-change', checkAuth);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('auth-change', checkAuth);
    };
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`mx-4 md:mx-12 rounded-full px-6 py-3 transition-all duration-300 ${isScrolled ? 'glassmorphism bg-white/80 dark:bg-black/80 shadow-lg' : 'bg-transparent'}`}>
        <div className='flex justify-between items-center'>
          {/* Logo & Main Nav */}
          <div className='flex gap-2 md:gap-8 items-center'>
            <div onClick={() => router.push('/')} className="cursor-pointer flex items-center gap-2">
              <img
                src='/grocery-store-logo.jpg'
                alt="logo"
                className='w-10 h-10 object-contain rounded-full'
              />
              <span className="font-bold text-xl text-emerald-800 dark:text-emerald-400 hidden md:block tracking-tight">GroceryApp</span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className='flex gap-1 items-center cursor-pointer hover:text-emerald-600 transition-colors font-medium'>
                <Globe size={18} />
                Home
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className='flex items-center gap-2 cursor-pointer hover:text-emerald-600 transition-colors font-medium select-none'>
                    <LayoutGrid className='h-4 w-4' />
                    Categories
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 glassmorphism border-none">
                  <DropdownMenuLabel>Shop by Category</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {categoryList.map((category, index) => (
                    <Link key={index} href={'/product-category/' + category.name}>
                      <DropdownMenuItem className="cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 gap-3 py-2">
                        <img src={category.icon} alt={category.name} className='w-6 h-6 object-contain' />
                        <span className="font-medium">{category.name}</span>
                      </DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          <div className='hidden lg:flex flex-1 max-w-md mx-8 relative group'>
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
              <Search className='h-5 w-5' />
            </div>
            <input
              type="text"
              placeholder='Search for products...'
              className='w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-emerald-500/50 transition-all outline-none'
            />
          </div>

          {/* Right Actions */}
          <div className='flex items-center gap-4'>
            <div
              className='flex items-center gap-2 cursor-pointer hover:text-emerald-600 transition-colors relative group'
              onClick={() => router.push('/cart')}
            >
              <div className="relative">
                <ShoppingBag size={22} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">0</span>
              </div>
              <span className="hidden md:block font-medium">Cart</span>
            </div>

            {!isLogin ? (
              <Link href='/sign-in'>
                <Button className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                  Login
                </Button>
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 hover:bg-emerald-200 transition-colors">
                    <UserIcon size={20} />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 glassmorphism border-none">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer gap-2">
                    <UserIcon size={16} /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/my-order')} className="cursor-pointer gap-2">
                    <ShoppingBag size={16} /> My Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout} className="cursor-pointer gap-2 text-red-500 hover:text-red-600">
                    <span className="font-medium">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div >

      {/* Mobile Menu */}
      < AnimatePresence >
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-2 py-2" onClick={() => setMobileMenuOpen(false)}>
                <Globe size={18} /> Home
              </Link>
              <div className="py-2">
                <div className="flex items-center gap-2 mb-2 font-medium text-gray-500">
                  <LayoutGrid size={18} /> Categories
                </div>
                <div className="grid grid-cols-2 gap-2 pl-4">
                  {categoryList.map((cat, i) => (
                    <Link key={i} href={'/product-category/' + cat.name} onClick={() => setMobileMenuOpen(false)} className="text-sm py-1">
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence >
    </motion.header >
  )
}

export default Header;
