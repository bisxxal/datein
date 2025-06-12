import { getUserProfilePic } from "@/actions/user.action"
import Link from "next/link"
import { AiTwotoneEdit } from "react-icons/ai";
import { VscVerified } from "react-icons/vsc";
import { FaBug } from "react-icons/fa6";
import { IoShareOutline } from "react-icons/io5";
import BackgroundPatten from "@/components/ui/backgroundPatten";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import GlareHover from "@/components/ui/glassHover";
import UserNavbar from "../_components/UserNavbar";
import { redirect } from "next/navigation";

const UserProfile = async() => {
    const user = await getUserProfilePic();
    if(user?.photos[0]?.url === undefined) {
      redirect('/profile/editprofile')
    }
  return (
      <BackgroundPatten>
    <div className=" w-full min-h-screen  relative overflow-hidden">
     
      <UserNavbar/>

      <div className=" flex relative mt-[120px] w-fit mx-auto flex-col items-center  justify-center  ">
         

      <GlareHover
        glareColor="#ffffff"
        glareOpacity={0.4}
        glareAngle={-30}
        glareSize={300}
        transitionDuration={1000}
        playOnce={false}
        className="bg-transparent !w-[150px] !border-none shadow-xl !rounded-full !h-[150px]">

    <img className=" w-[150px] h-[150px] object-cover border border-black/10 rounded-full  " src={user?.photos[0]?.url}  alt="" />
  </GlareHover>

      <Link href={'/profile/editprofile'} className="  glass text-white absolute   w-[50px] h-[50px]   backdrop-blur-[8px] -top-2 - right-2 flex justify-center items-center gap-3">  <AiTwotoneEdit size={21}/></Link>

      <p className="font-bold text-xl center gap-2 mt-20">{user?.name} , {user?.profile?.age} { user.verified ===true && <span className=" text-green-500"><RiVerifiedBadgeLine /></span> }  </p>

     { user.verified === false && <p className="text-lg text-gray-400 center gap-3 mt-3">Not verified yet. ⚠️ </p>}
      </div>

    <div className="mt-20 pb-10 max-md:mt-10 max-md:px-2 px-10 text-white">
    <div className="  glass center gap-2 !justify-evenly h-[350px] max-md:h-[400px] max-md:flex-col w-full  max-md:rounded-3xl max-md:p-1 max-md:py-2 p-10">

    <GlareHover
        glareColor="#ffffff"
        glareOpacity={0.4}
        glareAngle={-30}
        glareSize={300}
        transitionDuration={1000}
        playOnce={false}
        className="bg-transparent w-[30%] !rounded-3xl max-md:w-[90%] flex-col !h-full"
      >
     {user?.verified === false && <Link href={'/verified'} className=" w-full px-5 flex-col h-full border-2 border-green-600 bg-green-600/30  rounded-3xl center">
        <p className=" center my-4 max-md:my-1 text-3xl max-md:text-xl gap-4">  Get Verified <VscVerified /></p>
        <p className=" max-md:text-xs">Not Verified yet.</p>
      </Link>}
  </GlareHover>

    <GlareHover
        glareColor="#ffffff"
        glareOpacity={0.4}
        glareAngle={-30}
        glareSize={300}
        transitionDuration={1000}
        playOnce={false}
        className="bg-transparent w-[30%] !rounded-3xl max-md:w-[90%] flex-col !h-full"
      >
      <div className=" w-full px-5 flex-col h-full border-2 border-blue-500 bg-blue-600/30  rounded-3xl center">
        <p className=" center my-4 max-md:my-1 text-3xl max-md:text-xl gap-4"> Share Date in. <IoShareOutline /> </p>
        <p className=" max-md:text-xs text-center "> share Date in .</p>
      </div>
      </GlareHover>
    <GlareHover
        glareColor="#ffffff"
        glareOpacity={0.4}
        glareAngle={-30}
        glareSize={300}
        transitionDuration={1000}
        playOnce={false}
        className="bg-transparent  w-[30%] !rounded-3xl max-md:w-[90%] flex-col !h-full"
      >
      <Link href={'/report-spam'} className=" w-full px-5 flex-col h-full border-2 border-red-500 bg-red-600/30  rounded-3xl center">
        <p className=" center my-4 max-md:my-1 text-3xl max-md:text-xl gap-4"> Report Bug  <FaBug /></p>
        <p className=" max-md:text-xs text-center ">Report a bug . helps us to enhance our app .</p>
      </Link>
      </GlareHover>
      </div>

      
    </div>
 
    </div>
</BackgroundPatten>
  )
}

export default UserProfile