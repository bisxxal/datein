'use client'
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

const Back = ({ url, className }: { url: string, className: string }) => {
  const router = useRouter()
  return (
    <div onClick={() => router.push(url)} className={` ${className} text-white w-fit text-2xl m -5 h-fit p-2   glass  flex items-center justify-center cursor-pointer hover:bg-[#c3c2c2] transition-all duration-300 `}>
      <ArrowLeft />
    </div>
  )
}

export default Back