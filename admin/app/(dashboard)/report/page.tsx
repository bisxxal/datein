import { getReportedUsers } from '@/action/admin.action'
import Link from 'next/link'
import React from 'react'
import { IoEyeOutline } from 'react-icons/io5'

const ReportPage = async() => {

  const data = await getReportedUsers()
  return (
    <div>
      <h1 className='text-2xl font-bold'>Reported Users</h1>
      <div className='flex flex-col  gap-4'>
        {data.map((user:any) => (
          <div key={user.id} className='p-4 w-[70%] max-md:w-[90%] mx-auto glass px-6 center !justify-between rounded-lg shadow-md'>
           <div>
             <h2 className='text-xl font-semibold'>{user.reportedId}</h2>
            <p className='text-red-600 tex-lg'>Reason: {user.reason}</p>
            <p className='text-gray-500'>Reported by: {user.reporter.name} ({user.reporter.email})</p>
            <p className='text-gray-500'>Reported on: {new Date(user?.createdAt).toLocaleDateString()}</p>
           </div>

            <Link className='block w-fit base2 text-4xl rounded-full glass p-3 textbase' href={`/view/${user.reportedId}`}><IoEyeOutline /></Link>
          </div>
        ))}
        </div>
     
    </div>
  )
}

export default ReportPage