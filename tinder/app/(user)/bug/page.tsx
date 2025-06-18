'use client'
import { reportBug } from '@/actions/other.actions'
import Back from '@/components/ui/back'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FaBug } from 'react-icons/fa'
import { FiLoader } from 'react-icons/fi'

const BugPage = () => {

  const [show, setShow] = useState(false)
  const handleSubmit = async (formData: FormData) => {
    reportBugs({ formData });
  }

  const { mutate: reportBugs, isPending } = useMutation({
    mutationFn: async ({ formData }: { formData: FormData }) => {
      return await reportBug(formData);
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Bug reported successfully 👍');
      setShow(true);
    },

    onError: (error) => {
      toast.error(error.message || 'Failed to report bug');
      console.error('Upload failed', error);
    },
  });
  return (
    <div className=' w-full h-screen overflow-hidden'>
      <Back url={'/profile'} className=' m-5' />
      <div className="flex flex-col w-full items-center justify-center mt-20">
        <h1 className="text-3xl center gap-4 font-bold">Report a bug ! <FaBug className=' text-gray-500' /></h1>
        <p className="mt-4 text-gray-500 text-center text-lg">Report a bug ! help us to improve our app.</p>

        {!show ? <form action={handleSubmit} className='w-full flex flex-col items-center justify-center mt-10'>
          <div className='flex flex-col !justify-start w-[40%]  max-md:w-[85%] '>
            <p className=' !text-gray-800 text-xl'>Title</p>
            <input name='titel' required className='textbase font-semibold  border-2 outline-none bg-white/70 text-xl px-5 max-md:px-3 my-3    w-full mx-auto max-md:text-base rounded-3xl h-14 max-md:h-10' type="text" />

            <p className='!text-gray-800 text-xl'>Description</p>
            <textarea rows={1212} name='description' required className='  border-black/20  border-2 outline-none bg-white/70 text-xl px-5 py-1 max-md:px-3 my-3  w-full mx-auto max-md:text-base rounded-3xl max-md:h-10 h-14 ' />

          </div>
          <button type='submit' disabled={isPending} className=' cent er max-w-full buttonbg2 text-white px-10 py-3 rounded-full text-xl'>

            {isPending ? <FiLoader className='text-xl animate-spin ' /> : ' Sumbit'}</button>
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