import { getReportedUsers } from '@/action/admin.action'
import Link from 'next/link'
import React from 'react'
import { IoEyeOutline } from 'react-icons/io5'

const ReportPage = async () => {

  const data = await getReportedUsers()
  return (
    <div>
      <h1 className='text-2xl text-center textbase my-10 font-bold'>Reported Users ({data.length})</h1>
      <div className='flex flex-col gap-4'>
        {data.map((user: any) => (
          <div key={user.id} className='p-4 w-[70%] max-md:w-[90%] mx-auto border border-black/20 shadow-xl px-6 center !justify-between rounded-3xl shadow-md'>
            <div>
              <p className='text-red-600 font-semibold text-xl tex-lg'>Reason: {user.reason}</p>
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