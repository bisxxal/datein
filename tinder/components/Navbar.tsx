import Link from "next/link"
import { getUserProfilePic } from "@/actions/user.action";
import { redirect } from "next/navigation";
import { Bug, Settings } from "lucide-react";

const UserNavbar = async () => {
  const user = await getUserProfilePic();
  if (user?.photos && user?.photos[0]?.url === undefined) {
    throw redirect('/profile/editprofile');
  }

  return (
    <div className="fixed !h-[60px] z-[100] menuanimation border-t border-x border-black/10 backdrop-blur-[50px]   w-full   shadow-lg   items-center text-white flex justify-between px-20 max-md:px-5">
      <Link className="text-2xl font-bold logo2" href={'/match'}>Date in.</Link>
      <div className="flex !text-3xl  items-center gap-5">
        <Link className=" text-gray-400 " href={'/bug'}><Bug /></Link>
        <Link className=" text-gray-400 " href={'/profile/settings'}><Settings /></Link>
      </div>
    </div>
  )
}

export default UserNavbar