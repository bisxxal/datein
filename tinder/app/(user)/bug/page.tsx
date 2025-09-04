'use client'
import { reportBug } from '@/actions/other.actions'
import Back from '@/components/ui/back'
import { reportABug, TReportABug } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Bug, Loader } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast' 

const BugPage = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm<TReportABug>({ resolver: zodResolver(reportABug), })
  const [show, setShow] = useState(false)
  const { mutate: reportBugs, data, isPending } = useMutation({
    mutationFn: async (data: TReportABug) => {
      return await reportBug(data);
    },
    onSuccess: (data) => {

      if (data.status === 200) {
        toast.success(data.message || 'Bug reported successfully 👍');
        setShow(true)
      }

    },

    onError: (error) => {
      toast.error(error.message || 'Failed to report bug');
    },
  });

  const onSubmit = (data: TReportABug) => {
    reportBugs(data);
  }

  return (
    <div className=' w-full h-screen overflow-hidden'>
      <Back url={'/profile'} className=' m-5' />
      <div className="flex flex-col w-full items-center justify-center mt-20">
        <h1 className="text-3xl center gap-4 font-bold">Report a bug ! <Bug className=' text-red-500' /></h1>
        <p className="mt-4 text-gray-500 text-center text-lg">Report a bug ! help us to improve our app.</p>

        {!show ? <>
          <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col items-center justify-center mt-10'>
            <div className='flex flex-col !justify-start w-[40%]  max-md:w-[85%] '>
              <p className=' !text-gray-800  '>Title</p>
              <input   {...register("title")} className='textbase font-medium  border outline-none bg-white/70 text-lg  px-3 my-3    w-full mx-auto rounded-2xl  h-10' type="text" />
              {errors?.title && <span className=' text-sm  text-red-500'>{errors?.title?.message}</span>}
              <p className='!text-gray-800  '>Description</p>
              <textarea
                {...register('description')} rows={4} className='  border-black/20  border-2 outline-none bg-white/70 py-1 px-3 my-3  w-full mx-auto rounded-3xl  ' />
              {errors?.description && <span className='  text-sm text-red-500'>{errors?.description?.message}</span>}
            </div>
            <button type='submit' disabled={isPending} className=' disabled:opacity-[0.6] disabled:cursor-not-allowed max-w-full buttonbg2 text-white px-10 py-3 rounded-full text-lg'>

              {isPending ? <Loader className='text-xl animate-spin ' /> : ' Sumbit'}</button>
          </form>

          {
            data?.status === 429 && <p className=' text-red-500 text-sm border border-red-500/30 w-[70%] mx-auto py-5 rounded-2xl center bg-red-500/20  mt-5'>{data?.message}</p>
          }
        </>
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