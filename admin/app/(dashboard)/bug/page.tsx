import { fixBug, getBugReports } from '@/action/admin.action'
import { Eye } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react' 

const page = async () => {
  const data = await getBugReports()

  const deleteBug = async (fromData:FormData) => {
    'use server'
    const id = fromData.get('id') as string
    if (!id) {
      return
    }
    const res = await fixBug(id)
     redirect('/bug')
  }
  return (
    <div>
      <h1 className='text-2xl text-center textbase my-6  font-bold'>Bug Reports ({data.length})</h1>
      <div className='mt-4'>
        {data?.map((bug: any) => (
          <div key={bug?.id} className='border border-black/20 shadow-xl flex items-center justify-between  w-[70%] mx-auto rounded-3xl p-4 mb-4 '>
           <div className=' flex flex-col gap-2'>
             <h2 className='text-xl font-semibold'>Titel : <span className=' textbase'>{bug?.titel}</span></h2>
            <p className='text-gray-700'>Description : <span className='font-medium text-red-500'> {bug?.description}</span></p>
            <p className='text-gray-700'>Date : {new Date(bug?.createdAt).toLocaleTimeString()}</p>
            <div className='text-sm text-gray-500'>Reported by: {bug?.userId}  </div>
           </div>

            <form action={deleteBug} className=' flex items-center gap-4'>
            <button className=' buttonbg p-3 px-8 rounded-full shadow-xl '>Fixed</button>
            <input defaultValue={bug.id} type="text"  hidden name='id'  />
            <Link className='block w-fit base2 text-4xl rounded-full glass p-3 textbase' href={`/view/${bug?.userId}`}><Eye /></Link>
            </form>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page