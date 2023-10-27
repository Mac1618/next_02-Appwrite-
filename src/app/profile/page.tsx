"use client";
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

function ProfilePage() {
  const router = useRouter();

  // logout the user
  const onLogout = async() => {
    try {
      await axios.get('/api/users/logout')
      // move back to login page
      return router.push("/login")
    
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>ProfilePage</h1>
      <hr />
      <p className='text-4xl'>Profile page</p>

      <button 
        onClick={() => onLogout()}
        className='bg-blue-500 mt-4 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded'>
      Logout</button>
    </div>
  )
}

export default ProfilePage