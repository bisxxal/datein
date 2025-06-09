'use client'
import { getVerified } from '@/actions/verifyReport'
import Back from '@/components/ui/back'
import React from 'react'
import { VscVerified } from 'react-icons/vsc'

const VerifiedPage = () => {

  const handleSubmit = async (formData:FormData) => {
    try {
      const res = await getVerified(formData)
    } catch (error) {
      
    }
  }
  return (
    <div className=' w-full h-screen overflow-hidden'>
       <Back/>
        <div className="flex flex-col w-full items-center justify-center mt-20">
          <h1 className="text-3xl center gap-4 font-bold">Get verified! <VscVerified className=' text-green-500' /></h1>
          <p className="mt-4 text-lg">get verified by entering your role no of your batch.</p>
          <p className="mt-2 text-lg">This will help us to verify you.</p>

          <form action={handleSubmit} className=' flex flex-col items-center justify-center mt-10'>
          <input name='roll' required className=' uppercase border-2 outline-none bg-white/10 text-2xl px-5 my-10 w-[500px] rounded-3xl h-14' type="text" placeholder=' eg : 232313bfjnvjewg3' />

          <button type='submit' className='w-[500px] bg-blue-600 text-white px-10 py-3 rounded-full text-xl'>Verify</button>
          </form>
        </div>

    </div>
  )
}

export default VerifiedPage