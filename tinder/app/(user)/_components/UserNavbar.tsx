import Link from "next/link"
import { MdReport } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";

const UserNavbar = () => {
  return (
    <div className=" h-[60px] bg-[#ffffff54]   backdrop-blur-[10px] w-[90%] mx-auto mt-5 shadow-lg rounded-4xl  items-center text-white flex justify-between px-20 max-md:px-5">
         <Link className="text-2xl font-bold textbase" href={'/match'}>Date in.</Link>
        <div className="flex !text-3xl  items-center gap-5">
          <Link href={'/user/report-spam'}><MdReport /></Link>
          <Link href={'/user/profile/settings'}><IoSettingsSharp /></Link>
        </div>
      </div>
  )
}

export default UserNavbar