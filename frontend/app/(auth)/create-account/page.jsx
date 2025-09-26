"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { registerUser } from '@/app/_utils/GlobalApi'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const CreateAccount = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/');
    }
  }, [])

  const onCreateAccount = async () => {
    console.log("Attempting to register with:", { username, email, password });

    if (!username || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const data = await registerUser(username, email, password);
      localStorage.setItem('token', data.token);
      toast.success("Account has been created.");

      router.push('/');
    } catch (error) {
      // Show backend message if available
      toast.error(error.message || "Error creating account");
    }
  }

  return (
    <div className='flex justify-center items-baseline my-20'>
      <div className='flex flex-col justify-center items-center bg-emerald-900 p-10 gap-2 rounded-md'>
        <img src="/grocery-store-logo.jpg" alt="logo" className='w-24 h-24' />
        <h2 className='font-bold text-2xl'>Create an Account</h2>
        <div className='flex flex-col gap-4 w-full mt-6'>
          <Input
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={onCreateAccount}
            disabled={!username || !email || !password}
          >
            Create an Account
          </Button>
          <p>
            Already have an Account?
            <Link href='/sign-in' className='text-blue-500'> click here to login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CreateAccount
