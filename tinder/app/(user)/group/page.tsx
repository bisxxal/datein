'use client';
import { CiLock } from "react-icons/ci";
import { motion } from "framer-motion";
import Link from "next/link";
const GroupPage = () => {
    const isVerified = true; // This should be replaced with actual verification logic
  return (
    <div className=" w-full relative h-screen overflow-hidden">
        {isVerified ? 
        <>
        <div className=" w-[90%] glass mt-5 h-[60px] left-[5%] center !justify-between px-4 fixed ">
                    <h1 className=" text-xl textbas logo font-semibold">Date in.</h1>
                    <h1 className=" text-base ">Group Chat</h1>                   
            </div> 
        <div className=" w-full h-full">
            {/* <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
                className=" w-full h-full center flex-col gap-10">
                <h1 className=" text-3xl font-semibold">Group Chat</h1>
                <p className=" text-gray-500">Welcome to the group chat! Here you can interact with other verified users.</p>
                </motion.div> */}
             
            
            <div className=" mt-[65px] h-screen   ">

            </div>
        </div> 
        </>
        
        : <div className=" w-full center gap-20 flex-col h-full" >
            <p className=" text-gray-500 ">Only Verified Person can access Group chat</p>

            <div className=" center">   
                 <div className=" relative border   text-white text-xs  px-6 py-3  ">
                    <div className=" h-[200px] blur-[2px] w-[200px] absolute  -left-9 -top-11 rounded-full !duration-700  center backdrop-blur-[10px] buttonbg  animate-ping  "></div>
                    <div className=" h-[140px] blur-[2px] w-[140px]  absolute  -top-4  -left-1.5  rounded-full !duration-700  center backdrop-blur-[10px] delay-[1.5s]  buttonbg animate-ping  "></div>
                        <div className=" h-[80px] w-[80px]  shadow-xl  top-15 left-15 rounded-full !duration-700  center backdrop-blur-[10px] bg-blue-60 buttonbg   ">
                        <CiLock className=" text-3xl text-blue-800"/>
                        </div>
                </div>
            </div>

            <Link href={'/verified'} className="buttonbg2  shadow-xl rounded-full cursor-pointer p-5 py-2 mt-20 textbase font-semibold">Verify your account</Link>
        </div> 
        }
    </div>
  )
}

export default GroupPage