'use client';

// nextjs router
import Link from 'next/link'
import { useRouter } from 'next/navigation';

// react
import React, { useState, useEffect } from 'react'
import axios from 'axios';

const LoginPage = () => {
  const router = useRouter();
  const [ user, setUser ] = React.useState({
    email: '',
    password: ''
  })

  const [ isLoading, setIsLoading ] = useState(false);
  const [ buttonDisabled, setButtonDisabled ] = useState(false);

  // Login request
  const onLogin= async () => {
    setIsLoading(true)
    try {
      const response = await axios.post('/api/users/login', user)
      console.log("Login success", response.data)

      //push to profile page
      router.push('/profile');

    } catch (error: any ) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return(
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{isLoading ? "Loading please wait..." : "Login Page" }</h1>
      <hr />

      {/* email */}
      <label htmlFor="email">email</label>
      <input 
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        id='email'
        type="text"
        placeholder='email'
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})} />

      {/* password */}
      <label htmlFor="password">password</label>
      <input 
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        id='password'
        type="password"
        placeholder='password'
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})} />

        {/* buttons */}
        <button 
          className='p-2 border border-gray-300 rounded-lg mb-4 focus:ouline-none focus:border-gray-600'
          disabled={buttonDisabled}
          onClick={onLogin}
        >Login here</button>
        <Link href='/signup'>Visit the signup page</Link>

    </div>
  )
}

export default LoginPage;