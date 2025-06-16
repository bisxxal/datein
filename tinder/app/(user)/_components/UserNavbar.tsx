import Link from "next/link"
import { MdReport } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { getUserProfilePic } from "@/actions/user.action";
import { redirect } from "next/navigation";

const UserNavbar = async() => {
  const user = await getUserProfilePic();

  if(user?.photos[0]?.url === undefined) {
    // Throwing redirect is the correct way in a server component
    throw redirect('/profile/editprofile');
  }
  return (
    <div className=" h-[60px] glass w-[90%] mx-auto mt-5 shadow-lg rounded-4xl  items-center text-white flex justify-between px-20 max-md:px-5">
         <Link className="text-2xl font-bold   logo2" href={'/match'}>Date in.</Link>
        <div className="flex !text-3xl  items-center gap-5">
          <Link className=" text-gray-300 " href={'/report-spam'}><MdReport /></Link>
          <Link className=" text-gray-300 " href={'/profile/settings'}><IoSettingsSharp /></Link>
        </div>
      </div>
  )
}

export default UserNavbar