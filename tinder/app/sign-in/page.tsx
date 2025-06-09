'use client'
import Back from '@/components/ui/back'
import SignInButton from '@/components/ui/SignInButton'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const SignInPage = () => {
  const router = useRouter()
  async function myFunction() {
  const session = await getSession()
  if (session?.user?.name) {
    router.push('/user/profile')
  }
}
useEffect(()=>{
  myFunction()
},[])
  return (
    <div className=' w-full min-h-screen '>

      <Back />
      <div className='flx center flex-col '>
      <h1 className=' text-7xl font-extrabold'>Date in.</h1>
      <div className=''>
      <SignInButton text={'Loging with google'} /> 
      </div>
      </div>
    </div>
  )
}

export default SignInPage