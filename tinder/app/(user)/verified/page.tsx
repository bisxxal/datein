'use client'
import { getVerified } from '@/actions/other.actions'
import Back from '@/components/ui/back'
import React from 'react'
import { VscVerified } from 'react-icons/vsc'

const VerifiedPage = () => {

  const handleSubmit = async (formData: FormData) => {
    try {
      const res = await getVerified(formData)
    } catch (error) {

    }
  }
  return (
    <div className=' w-full h-screen overflow-hidden'>
      <Back url={'/profile'} className=' m-5' />
      <div className="flex flex-col w-full items-center justify-center mt-20">
        <h1 className="text-3xl center gap-4 font-bold">Get verified! <VscVerified className=' text-green-500' /></h1>
        <p className="mt-4 text-gray-500 text-centertext-lg">get verified by entering your role no of your batch.</p>
        <p className="mt-2 text-gray-400 text-lg">This will help us to verify you.</p>

        <form action={handleSubmit} className='w-full flex flex-col items-center justify-center mt-10'>
          <input name='roll' required className='textbase uppercase border-2 outline-none bg-white/70 text-2xl px-5 max-md:px-3 my-10 w-[500px] max-md:w-[80%] max-md:text-base rounded-3xl h-14 max-md:h-12' type="text" placeholder=' eg : 232313bfjnvjewg3' />
          <button type='submit' className='w-[500px] max-md:w-[80%] buttonbg2 text-white px-10 py-3 rounded-full text-xl'>Verify</button>
        </form>
      </div>

    </div>
  )
}

export default VerifiedPage