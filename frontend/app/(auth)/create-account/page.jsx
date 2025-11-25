"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { registerUser } from '@/app/_utils/GlobalApi'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'

const CreateAccount = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/');
    }
  }, [])

  const onCreateAccount = async () => {
    if (!username || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser(username, email, password);
      localStorage.setItem('token', data.token);
      toast.success("Account created successfully!");
      router.push('/');
    } catch (error) {
      toast.error(error.message || "Error creating account");
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
            <h2 className='font-bold text-3xl text-gray-800'>Create Account</h2>
            <p className='text-gray-500 mt-2 text-center'>Join us to start your grocery journey</p>
          </div>

          <div className='flex flex-col gap-5'>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 transition-all"
              />
            </div>

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
              onClick={onCreateAccount}
              disabled={!username || !email || !password || loading}
              className="h-12 text-lg font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                <>
                  Create Account <ArrowRight className="ml-2" size={20} />
                </>
              )}
            </Button>

            <div className='text-center mt-4'>
              <p className='text-gray-600'>
                Already have an account?{' '}
                <Link href='/sign-in' className='text-emerald-600 font-semibold hover:underline transition-colors'>
                  Sign in
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

export default CreateAccount
