'use client'
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react' 

const Back = ({ className }: { className: string }) => {
  const router = useRouter()
  return (
    <div onClick={() => router.back()} className={` ${className} w-fit text-2xl m -5 h-fit p-2 rounded-full bg-[#0000000f glass backdrop-blur-[4px] flex items-center justify-center cursor-pointer hover:bg-[#c3c2c2] transition-all duration-300 `}>
      <ArrowLeft />
    </div>
  )
}

export default Back