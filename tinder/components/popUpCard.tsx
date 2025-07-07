'use client'
import { PopUpPropsExtended } from "@/util/constant";
import { MdOutlineInterests } from "react-icons/md";
import dynamic from 'next/dynamic';
import Link from "next/link";
import {  BadgeCheck, Ban, Building2, Languages, MapPinCheck, Ruler, University, X } from "lucide-react";
const KeywordButton = dynamic(() => import("./ui/keywordButton"), { ssr: false });
const PopUp = ({ current, displayed, setDisplayed, user }: PopUpPropsExtended) => {
  return (
    <div
      className={` popupcardAnimation text-white h-[75vh] shadow-xl absolute z-[20]  border-white/70 bg-[#0000002e]   backdrop-blur-[20px] justify-between w-[450px] max-md:w-[95%] mt-14 p x-5 bottom-0 pt-[0px] rounded-3xl flex`}>

      <div className="  flex text-lg flex-col gap-5 w-full  rounded-3xl scrollbar overflow-y-auto">
        <h2 onClick={() => { setDisplayed(!displayed) }} className={` ${displayed ? 'w-full pt-2 pr-3 flex  items-end justify-end ' : ' hidden '} text-white mx-auto  cursor-pointer  `}>
          <X size={23} /> </h2>

        <div className=" center gap-3">
          <h1 className=" text-3xl max-md:text-2xl center font-bold">{current.name}  {current.verified === true && <span className=" text-2xl mx-2  text-green-600"><BadgeCheck /></span>}  </h1> <span className=" font-bold max-md:text-xl text-2xl"> , {current.profile.age}</span>
        </div>

        {current.profile.bio && <div className="  glass4 px-4 max-md:px-4 w-[95%] mx-auto  py-2">
          <p className=" font-semibold text-xl">About Me</p>
          <h1 className=" mt-2 text-sm ">{current.profile.bio}</h1>
        </div>}

        {current.profile.lookingFor && <div className=" glass4 px-4 max-md:px-4 w-[95%] mx-auto  py-2">
          <p>Looking for</p>
          <h1 className=" text-base ">{current.profile.lookingFor} </h1>
        </div>}

        {current.profile.livingIn && <div className=" glass4 px-4 max-md:px-4 w-[95%] mx-auto py-3">
          <p className=" center gap-2 mb-2 !justify-start"> <MapPinCheck size={22} /> Living in </p>
          <h1 className=" text-base ">{current.profile.livingIn}</h1>
        </div>
        }

        {current.profile.age && <div className=" glass4 max-md:px-4 w-[95%] mx-auto px-3 py-2">
          <p>Age</p>
          <h1 className=" text-base ">{current.profile.age}</h1>
        </div>
        }

        {current.profile.batch && <div className=" glass4 max-md:px-4 w-[95%] mx-auto px-3 py-2">
          <p className=" center gap-2 mb-2 !justify-start"><University size={21} />Batch</p>
          <h1 className=" text-base ">{current.profile.batch}</h1>
        </div>}

        {current.profile.job && <div className=" glass4 max-md:px-4 w-[95%] mx-auto px-3 py-2">
          <p className=" center gap-2 mb-2 !justify-start"><Building2 size={18} />Working at</p>
          <h1 className=" text-base ">{current.profile.job}</h1>
        </div>}
        {current.profile.height && current.profile.height >= 18 && <div className=" glass4 max-md:px-4 w-[95%] mx-auto px-3 py-2">
          <p className="center gap-2 mb-2 !justify-start"> <Ruler />Height</p>
          <h1 className=" text-base ">{current.profile.height}</h1>
        </div>}
        {current.profile.languages && <div className=" glass4 max-md:px-4 w-[95%] mx-auto px-3 py-2">
          <p className=" center gap-2 mb-2 !justify-start"><Languages size={22} />Language</p>
          <h1 className=" text-base ">{current.profile.languages}</h1>
        </div>}

        <div className=" glass4 max-md:px-4 w-[95%] mx-auto px-3 py-2">
          <p className="flex items-center gap-3 my-2 "><MdOutlineInterests size={21} /> Interests</p>
          <KeywordButton current={current} user={user} />
        </div>
        <Link href={`/report/${current.id}?userid=${user.id}`} className="max-md:px-4 w-[95%] mx-auto bg-[#b34d4d9c] block my-4 border border-red-500 rounded-3xl px-5 py-4 ">
          <p className="center text-center gap-2"> <Ban /> Block & Report {current.name}</p>
        </Link>

      </div>
    </div>
  )
}
export default PopUp;