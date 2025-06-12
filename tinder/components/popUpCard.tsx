'use client'
import { PopUpPropsExtended } from "@/util/constant";
import { AiOutlineHome } from "react-icons/ai";
import { LuLanguages } from "react-icons/lu";
import { LuUniversity } from "react-icons/lu";
import { BsBuildings } from "react-icons/bs";
import {  MdOutlineInterests, MdKeyboardDoubleArrowDown } from "react-icons/md";
import { motion } from "framer-motion";
import AnimatedSwipe from "./ui/animatedSwipe";
import KeywordButton from "./ui/keywordButton";

const PopUp = ({current ,displayed , setDisplayed , user }:PopUpPropsExtended)=>{
  console.log("current is ", current);

  return(
    <motion.div key="details-panel"
            initial={{ y: 500, opacity: 0 }} animate={{ y: 0, opacity: 1 }}  exit={{ y: 500, opacity: 0 }}  
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="text-white h-[80vh] absolute z-[20] border-t border-white/70 bg-[#0000005c] py-3 backdrop-blur-[10px] justify-between w-[400px] max-md:w-[95%] mt-4 px-5 bottom-0 pt-[5px] rounded-3xl flex">

      <div className="scrollbarhidden flex text-lg flex-col gap-5 w-full  rounded-3xl overflow-y-auto">
          <button onClick={()=>setDisplayed(!displayed)} className={` ${displayed? ' flex ' : ' hidden '} w-1/2 text-white mx-auto center cursor-pointer  w-14 h-14   text-3xl `}> 
            <AnimatedSwipe text={<MdKeyboardDoubleArrowDown size={23}/>} /> </button>

          <div className="mb-5 center gap-3">
          <h1 className=" text-3xl max-md:text-2xl  font-bold">{current.name}</h1> <span className=" font-bold max-md:text-xl text-2xl"> , {current.profile.age}</span>
          </div>

          {current.profile.bio && <div className="  glass rounded-4xl px-6 max-md:px-5 py-3">
            <p className=" font-semibold text-xl">About Me</p>
            <h1 className=" mt-2 text-sm ">{current.profile.bio}</h1>
          </div>}

          {current.profile.lookingFor &&<div className=" glass bg-[#ffffff24] rounded-4xl px-6 max-md:px-5 py-3">
            <p>Looking for</p>
            <h1 className=" text-base ">{current.profile.lookingFor} </h1>
          </div>}

            {current.profile.livingIn &&<div className=" glass bg-[#ffffff24] rounded-4xl px-6 max-md:px-5 py-3">
            <p className=" center gap-2 mb-2 !justify-start"> <AiOutlineHome size={22}/> Living in </p>
            <h1 className=" text-base ">{current.profile.livingIn}</h1>
          </div>}

          {current.profile.age &&<div className=" glass bg-[#ffffff24] rounded-4xl px-6 max-md:px-5 py-3">
            <p>Age</p>
            <h1 className=" text-base ">{current.profile.age}</h1>
          </div>}

          {current.profile.batch &&<div className=" glass bg-[#ffffff24] rounded-4xl px-6 max-md:px-5 py-3">
            <p  className=" center gap-2 mb-2 !justify-start"><LuUniversity size={21} />Batch</p>
            <h1 className=" text-base ">{current.profile.batch}</h1>
          </div>}

          {current.profile.job &&<div className=" glass bg-[#ffffff24] rounded-4xl px-6 max-md:px-5 py-3">
            <p  className=" center gap-2 mb-2 !justify-start"><BsBuildings size={18} />Working at</p>
            <h1 className=" text-base ">{current.profile.job}</h1>
          </div>}
          {current.profile.height && current.profile.height >= 18 &&<div className=" glass bg-[#ffffff24] rounded-4xl px-6 max-md:px-5 py-3">
            <p >Height</p>
            <h1 className=" text-base ">{current.profile.height}</h1>
          </div>}
         {current.profile.languages && <div className=" glass bg-[#ffffff24] rounded-4xl px-6 max-md:px-5 py-3">
            <p  className=" center gap-2 mb-2 !justify-start"><LuLanguages size={22}/>Language</p>
            <h1 className=" text-base ">{current.profile.languages}</h1>
          </div>}

         

          <div className=" glass bg-[#ffffff24] rounded-4xl px-6 max-md:px-5 py-3">
            <p className="flex items-center gap-3 my-2 "><MdOutlineInterests size={21}/> Interests</p>
            <KeywordButton  current={current} user={user} />
          </div>


        <div className=" glass rounded-3xl px-5 py-3">

          <div className=" bg-[#b34d4d40] my-4 border border-red-500 rounded-3xl px-5 py-4 ">
            <p className=" text-center ">Block {current.name}</p>
          </div>

            <div className=" bg-[#150fad40] border border-blue-600 rounded-3xl px-5  py-4 !h-16">
            <p className=" text-center ">Report {current.name}</p>
          </div>
          
          </div>

      </div>
         </motion.div>
  )
}
export default PopUp;