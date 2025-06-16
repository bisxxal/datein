import { getForVerification, verifyUser } from '@/action/admin.action';
import VerificationForm from '@/components/verification';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import React from 'react'
import toast from 'react-hot-toast';
import { IoEyeOutline } from "react-icons/io5";
 
const Verification = async() => {

    const data = await prisma.verified.findMany({}) 
 
  return (
    <div className=' w-full min-h-screen mt-10 '>
        <div className='flex flex-col items-center justify-center h-full'>
            <h1 className='text-2xl font-bold mb-4'>Verification Page</h1>

            <div className='w-full max-w-2xl  rounded-lg p-6'>
                <h2 className='text-xl text-green-600 font-semibold mb-4'>Pending Verifications</h2>
                <ul className='space-y-4'>
                    {data && data?.map((item: any) => (
                        <div key={item.id} className='p-5 px-6 glass flex items-center justify-between rounded-lg'>
                            <div>
                                <p><strong>ID:</strong> {item.id}</p>
                            <p><strong>UserId:</strong> {item.userId}</p>
                            <p><strong>Roll No:</strong> {item.rollNo}</p>
                            </div>
 
                            <VerificationForm userId={item.userId} id={item.id} />
                        </div>
                    ))}
                </ul>
                {data?.length === 0 && <p className='text-gray-500'>No pending verifications.</p>}
                </div>
        </div>
    </div>
  )
}

export default Verification