'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { IoArrowBack } from "react-icons/io5";
 
const Back = () => {
    const router = useRouter()
  return (
    <div onClick={()=>router.back()} className=' w-fit text-2xl m -5 h-fit p-2 rounded-full bg-[#0000000f] backdrop-blur-[4px] flex items-center justify-center cursor-pointer hover:bg-[#c3c2c2] transition-all duration-300'>
        <IoArrowBack />
    </div>
  )
}

export default Back