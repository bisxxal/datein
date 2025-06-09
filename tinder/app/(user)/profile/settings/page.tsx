'use client'
import Back from '@/components/ui/back'
import { signOut } from 'next-auth/react'
import React from 'react'

const SettingPage = () => {
  return (
    <div className=' w-full p-10'>
        <Back  />
        <h2 className=' font-bold text-2xl mb-10'>Account Settings</h2>

    <div className=' flex flex-col gap-4'>
           <div className='p-3 px-6 center !justify-between  bg-[#00000026] rounded-xl '>
                <h1>Interested in </h1>

                <select name="" >
                    <option value="women">Women</option>
                    <option value="men">men</option>
                </select>
        </div>

         <div className='p-3 px-6 flex gap-4 flex-col  !justify-between  bg-[#00000026] rounded-xl '>
                <h1>Age range <span>19-30</span> </h1> <span></span> 

                <input type="range" name="age"  defaultValue={23} min={19} max={30} />
        </div>

        <div className='p-3 px-6 center !justify-between  bg-[#00000026] rounded-xl '>
                <h1>Block contacts</h1>

                 
        </div>
        <div className='p-3 px-6 center !justify-between  bg-[#00000026] rounded-xl '>
                <h1>report spam</h1>                 
        </div>
    
        <div>
            <h1>Contact Us</h1>
        <div className='p-3 px-6 center !justify-between  bg-[#00000026] rounded-xl '>
            <p>Help & support</p>     
        </div>
        </div>

         <div>
        <div className='p-3 px-6 center !justify-between  bg-[#00000026] rounded-xl '>
            <p>share Date in.</p>     
        </div>
        </div>
    
<button className=" buttonred p-6 py-2" onClick={() => signOut()}>Sign Out</button> 

    </div>
    </div>
  )
}

export default SettingPage