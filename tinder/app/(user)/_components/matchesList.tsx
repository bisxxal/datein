'use client'
import { createChartparticipent } from '@/actions/chart'
import Image from 'next/image'
import React, { useState } from 'react'
import { FiLoader } from "react-icons/fi";
 import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
const MatchesList = ({AllMatches}:{AllMatches:{photos:{url:string}[] ,id:string, name:string}[]}) => {
  
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const handelClicked = async(id:string)=>{
        setLoading(true)
        try {
            const res = await createChartparticipent(id)
            if(res?.chatId){
                console.log()
                router.push(`/chat/${res.chatId}`)
            }
            setLoading(false)
        } catch (error) {
            
        }
    }
    // console.log(AllMatches)
    return (
        <>
        { loading && <motion.div 
          initial={{ scale:0 ,x:500 ,y:-500, opacity: 0 }} animate={{ y: 0,x:0, scale:1 , opacity: 1 }}  exit={{ y: 500, opacity: 0 }}  
        transition={{ type: "spring", stiffness: 100, damping: 15 ,duration:0.9 }}
        className=' fixed top-5 text-2xl textbase border border-white font-bold  bg-[#c2c2c240] backdrop-blur-[12px] flex-col rounded-4xl z-[50]  center w-[95vw] h-[95vh]  '>
             Creating Chart 
            <FiLoader className='text-xl mt-5 animate-spin '/>
        </motion.div>}
      <div className='flex gap-5 scrollbar overflow-x-auto '>
        {AllMatches && AllMatches?.map((item, i)=> (
            <div onClick={()=>handelClicked(item?.id)} key={i} className=' cursor-pointer flex flex-col  ! w-[130px]'>
                    <Image className=' object-cover  w-full  h-[200px] rounded-3xl border border-white/80' src={item?.photos[0].url} alt={item.name} width={400} height={600}/>
                    <h1 className='pl-1 pt-1 text-sm text-gray-400'>{item.name}</h1>
                </div>
            ))}
        </div>
    </>
  )
}

export default MatchesList