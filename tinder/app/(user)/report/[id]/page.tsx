'use client';
import { reportUser } from '@/actions/other.actions';
import Back from '@/components/ui/back';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast'; 
import { FiLoader } from 'react-icons/fi';
const Reportpage = ( ) => {
  const param = useParams()
  const id = param.id as string ;
  const [show , setShow ]= useState(false)

  const handleClick = async(formData:FormData) => {
    try {
        const reason = formData.get('reason') as string;
        if (!reason) {
          toast.error('Please provide a reason for reporting');
          return;
        }
        report({ id, reason }); 
    } catch (error) {
      
    }
  }
 
  const  { mutate: report,  isPending  } = useMutation({
  mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
    return await reportUser(id, reason);
  },
  onSuccess: (data) => {
    toast.success(data.message || 'User reported successfully');
    setShow(true);
    // queryClient.invalidateQueries({ queryKey: ['fetchUsers'] });  
  },

  onError: (error) => {
    toast.error(  'Failed to report user');
    console.error('Upload failed', error);
  },
});


  return (
    <div>
        
         <Back url={'/profile'} className=' m-5'/>
        <div className="flex flex-col w-full items-center justify-center mt-20">
          

         { !show ? <>
         <h1 className="text-3xl center gap-4 textbase font-bold">Report user !  </h1>
          <p className="mt-4 text-gray-500 text-centertext-lg">Can you tell us what happedned ?</p>
         <form action={handleClick} className='w-full h-[50vh] max-md:h-[60vh] flex flex-col items-center justify-between mt-10'>
                <input  name='reason' placeholder='Reason' required className='textbase shadow-xl placeholder:text-gray-300  border-1 outline-none bg-white/70 text- px-5 max-md:px-3 my-3 w-[500px] max-md:w-[80%] mx-auto max-md:text-base rounded-3xl h-14 max-md:h-12' type="text"  />
             <div className=' center flex-col'>
             <p className=' !text-xs mb-2'>We Won't tell you repoted them</p>
             <button disabled={isPending} type='submit' className='w-[500px] center shadow-xl max-md:w-[80%] buttonbg2 text-white px-10 py-3 rounded-full max-md:text-base text-xl'>
              {isPending ?  <FiLoader className='text-xl animate-spin '/> :' Sumbit'}</button>
             </div>
          </form>
         </>
        : 
        <div className=' mt-[100px]  center flex-col gap-5'>
            <p className=' text-center text-green-500 text-2xl font-semibold'>Thanks for reporting  !</p>
            <Link className=' textbase  ' href={'/match'}>Continue Find your match.</Link>
        </div>  
        }
        </div>
    </div>
  )
}

export default Reportpage