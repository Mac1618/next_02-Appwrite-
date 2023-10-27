'use client';

// nextjs router
import Link from 'next/link'
import { useRouter } from 'next/navigation';

// react
import React, { useEffect } from 'react'
import axios from 'axios';

function SignupPage() {
  // next router 
  const router = useRouter();

  // buttons config
  const [ buttonDisabled,  setButtonDisabled ] = React.useState(false);
  const [ isLoading, setIsLoading ] = React.useState(false);

  // user useState
  const [ user, setUser ] = React.useState({
    email: '',
    password: '',
    username: '',
  })

  // signup button
  const onSignup = async () => {
    setIsLoading(true);
    try {
      // signup post request
      const response = await axios.post('/api/users/signup', user)
      console.log('Signup success', response.data )

      // push the user to login page
      router.push('/login')
    
    // catch error
    } catch (error: any) {
      console.log("Signup failed", error.message)
    } finally{
      setIsLoading(false);
    }
  }

  // disble the button
  useEffect(() => {
    if( user.email.length > 0 && user.username.length > 0 && user.password.length > 0){
        setButtonDisabled(false);
    } else{
        setButtonDisabled(true);
    }
  }, [user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{isLoading ? "Loading please wait..." : "Signup Page"}</h1>
      <hr />

      {/* username */}
      <label htmlFor="username">username</label>
      <input 
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        id='username'
        type="text"
        placeholder='username'
        value={user.username}
        onChange={(e) => setUser({...user, username: e.target.value})} />

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

        <button 
          className='p-2 border border-gray-300 rounded-lg mb-4 focus:ouline-none focus:border-gray-600'
          onClick={onSignup}
          disabled={buttonDisabled}
        >{buttonDisabled ? "Disabled" : "Signup here"}</button>
        <Link href='/login'>Visit the login page</Link>

    </div>
  )
}

export default SignupPage