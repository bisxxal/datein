'use client'
import { createChartparticipent } from '@/actions/chart'
import Image from 'next/image'
import React, { useState } from 'react'
import { FiLoader } from "react-icons/fi";
 import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
const MatchesList = ({AllMatches}:{AllMatches:{image:string ,id:string, name:string}[]}) => {
  
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
          initial={{ scale:0 , opacity: 0 }} animate={{ y: 0, scale:1 , opacity: 1 }}  exit={{ y: 500, opacity: 0 }}  
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className=' absolute top-0 text-2xl text-blue-600  font-bold  bg-[#c2c2c240] backdrop-blur-[12px] flex-col rounded-4xl  center w-[90%] h-[90%]  '> Creating Chart 
            <FiLoader className='text-xl mt-5 animate-spin '/>
        </motion.div>}

            
      <div className='flex gap-5 overflow-x-auto '>
        {AllMatches && AllMatches?.map((item, i)=> (
            <div onClick={()=>handelClicked(item?.id)} key={i} className=' flex flex-col  ! w-[130px]'>
                    <Image className=' object-cover  w-full  h-[200px] rounded-xl border border-black/20' src={item?.image} alt={item.name} width={400} height={600}/>
                    <h1 className='pl-1 pt-1 text-sm text-gray-400'>{item.name}</h1>
                </div>
            ))}
        </div>
    </>
  )
}

export default MatchesList