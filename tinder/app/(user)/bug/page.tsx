 

'use client'
import {   reportBug } from '@/actions/other.actions'
import Back from '@/components/ui/back'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FaBug } from 'react-icons/fa'

const BugPage = () => {

    const [show , setShow ]= useState(false)
  const handleSubmit = async (formData:FormData) => {
    try {
      const res = await reportBug(formData)
        if (res.status === 200) {
            toast.success('Bug reported successfully 👍')
            setShow(true)
        } else {
            console.log(res)
            toast.error(res.message || 'Failed to report bug')
        }
    } catch (error) {
      
    }
  }
  return (
    <div className=' w-full h-screen overflow-hidden'>
       <Back url={'/profile'} className=' m-5'/>
        <div className="flex flex-col w-full items-center justify-center mt-20">
          <h1 className="text-3xl center gap-4 font-bold">Report a bug ! <FaBug className=' text-gray-500' /></h1>
          <p className="mt-4 text-gray-500 text-centertext-lg">Report a bug ! help us to improve our app.</p>

         { !show ? <form action={handleSubmit} className='w-full flex flex-col items-center justify-center mt-10'>
             <div className='flex flex-col   items-start justify-center w-full   '>
                <p className=' text-center '>Title</p>
          <input name='titel' required className='textbase font-semibold  border-2 outline-none bg-white/70 text-2xl px-5 max-md:px-3 my-3 w-[500px] max-md:w-[80%] mx-auto max-md:text-base rounded-3xl h-14 max-md:h-12' type="text"  />
               
            <label className='!text-gray-800 text-center'>Description</label>
          <textarea rows={1090} cols={343} name='description' required className='  border-black/20  border-2 outline-none bg-white/70 text-2xl px-5 py-1 max-md:px-3 my-3 w-[500px] max-md:w-[80%] mx-auto max-md:text-base rounded-3xl h-14 '   />

             </div>
          <button type='submit' className='w-[500px] max-md:w-[80%] buttonbg2 text-white px-10 py-3 rounded-full text-xl'>Sumbit</button>
          </form>
        : 
        <div className=' mt-[100px] '>
            <p className=' text-center text-green-500 text-2xl font-semibold'>Thanks for reporting the bug !</p>
            <p className=' text-center text-green-500 text-lg '>We will fix it as soon as possible.</p>
        </div>  
        }
        </div>

    </div>
  )
}

export default BugPage