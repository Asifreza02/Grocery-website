
"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { loginUser } from '../_services/auth'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const SignIn = () => {


  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter()


    useEffect (()=>{
      const token = localStorage.getItem('token');
      if (token) {
        console.log("Token found:", token);
        toast('Already signed in')
        router.push('/')
      }
    },[])

  const onLoginAccount = async () => {
    try {
      await loginUser(email, password);
      toast.success("Login successful!")
      router.push('/')
    }
    catch (err) {
      toast.error("Invalid email or password");
    }
  }

  return (
    <div className='flex justify-center items-baseline my-20 '>
      <div className='flex flex-col justify-center items-center bg-emerald-900 p-10 gap-2 rounded-md'>
        <img src="/grocery-store-logo.jpg" alt="" className='w-24 h-24' />
        <h2 className='font-bold text-2xl'>Sign In</h2>
        <div className='flex flex-col gap-4  w-full mt-6'>
          <Input type='email' placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input type='password' placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={() => onLoginAccount()}
            disabled={(!password || !email)}
          >Sign In
          </Button>
          <p className='text-sm'>Don,t have an Account?
            <Link href='/create-account' className='text-blue-500'> click here to Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
