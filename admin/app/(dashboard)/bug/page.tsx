import { getBugReports } from '@/action/admin.action'
import Link from 'next/link'
import React from 'react'
import { IoEyeOutline } from 'react-icons/io5'

const page = async () => {
  const data = await getBugReports()
  return (
    <div>
      <h1 className='text-2xl font-bold'>Bug Reports</h1>
      <div className='mt-4'>
        {data?.map((bug: any) => (
          <div key={bug?.id} className='border p-4 mb-4 rounded'>
            <h2 className='text-xl font-semibold'>{bug?.titel}</h2>
            <p className='text-gray-700'>{bug?.description}</p>
            <p className='text-gray-700'>{new Date(bug?.createdAt).toLocaleTimeString()}</p>
            <Link href={`/view/${bug?.userId}`} className='text-sm text-gray-500'>Reported by: {bug?.userId}  </Link>

            <Link className='block w-fit base2 text-4xl rounded-full glass p-3 textbase' href={`/view/${bug?.userId}`}><IoEyeOutline /></Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page