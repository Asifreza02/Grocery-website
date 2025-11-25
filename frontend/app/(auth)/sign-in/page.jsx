
"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { loginUser } from '@/app/_utils/GlobalApi'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react'

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/')
    }
  }, [])

  const onLoginAccount = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.token);
      toast.success("Login successful!")
      router.push('/');
    }
    catch (err) {
      toast.error(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen flex justify-center items-center bg-gradient-to-br from-green-50 to-emerald-100 p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden'
      >
        <div className='p-8'>
          <div className='flex flex-col items-center mb-8'>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
              className="bg-emerald-100 p-3 rounded-full mb-4"
            >
              <img src="/grocery-store-logo.jpg" alt="logo" className='w-12 h-12 object-contain rounded-full' />
            </motion.div>
            <h2 className='font-bold text-3xl text-gray-800'>Welcome Back</h2>
            <p className='text-gray-500 mt-2 text-center'>Sign in to continue to your account</p>
          </div>

          <div className='flex flex-col gap-5'>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 transition-all"
              />
            </div>

            <Button
              onClick={() => onLoginAccount()}
              disabled={(!password || !email || loading)}
              className="h-12 text-lg font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                <>
                  Sign In <LogIn className="ml-2" size={20} />
                </>
              )}
            </Button>

            <div className='text-center mt-4'>
              <p className='text-gray-600'>
                Don't have an account?{' '}
                <Link href='/create-account' className='text-emerald-600 font-semibold hover:underline transition-colors'>
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
      </motion.div>
    </div>
  )
}

export default SignIn
