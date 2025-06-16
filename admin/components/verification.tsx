 'use client'
import { deleteVerification, verifyUser } from '@/action/admin.action'
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast'
import { IoEyeOutline } from 'react-icons/io5'

const VerificationForm = ({userId , id}:{userId:string , id:string}) => {
  const handelSumbit = async (   ) => {
        
        if(!id || !userId) {
            toast.error("Invalid data provided");
            return;
        }
        const res = await verifyUser(userId as string, id as string);
        if (res?.status === 200) {
            toast.success(res?.message)
        }
        else {
            toast.error(res?.message)
        }
    }

    const deleteVerificationSumbit = async () => {
      try {
         if(!id ) {
            toast.error("Invalid data provided");
            return;
        }
        const res = await deleteVerification(  id );
        if (res?.status === 200) {
            toast.success(res?.message)
        }
        else {
            toast.error(res?.message || "Failed to delete verification")
        }
      } catch (error) {
        
      }
    }

  return (
    <div className=' flex items-center gap-4'>
        <Link className=' base2 text-4xl rounded-full glass p-3 textbase' href={`/view/${userId}`}><IoEyeOutline /></Link>
        <div className='flex items-center gap-4'>     
        <button onClick={()=>handelSumbit()} className=' buttonbg2 p-3 rounded-full shadow-xl px-7' type='submit'>Verified</button>
        <button onClick={()=>deleteVerificationSumbit()} className=' buttonred p-3 rounded-full shadow-xl px-7' type='submit'>Delete </button>
        </div>
    </div>
  )
}

export default VerificationForm