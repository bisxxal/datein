import { getUserProfilePic } from "@/actions/user.action"
import Link from "next/link"  
import BackgroundPatten from "@/components/ui/backgroundPatten"; 
import GlareHover from "@/components/ui/glassHover";
import UserNavbar from "../../../components/Navbar";
import { redirect } from "next/navigation";
import KitImage from "@/components/ui/KitImage";
import { BadgeCheck, Bug, Pencil, Share } from "lucide-react";
import ShareCom from "@/components/ui/share";

const UserProfile = async () => {
  const user = await getUserProfilePic()
  if (user?.photos) {
    if (user?.photos[0]?.url === undefined) {
      redirect('/profile/editprofile')
    }
  }
  return (
    <BackgroundPatten>
      <div className=" w-full min-h-screen  relativ overflow-hidden">
        <UserNavbar />
        <div className=" flex relative mt-[80px] w-fit mx-auto flex-col items-center  justify-center  ">
          <GlareHover
            glareColor="#ffffff"
            glareOpacity={0.4}
            glareAngle={-30}
            glareSize={300}
            transitionDuration={1000}
            playOnce={false}
            className="bg-transparent appear relative overflow-hidden !w-[300px] !border-none shadow-xl !rounded-3xl !h-[400px]">
            <div className=" rounded-3xl     absolute top-5 shadow-xl left-5 w-fit h-fit px-4 py-3 backdrop-blur-[4px] bg-gradient-to-b from-black/20 to-transparent  f center">
            <p className="font-semibold  text-white center gap-2 ">{user?.name} , {user?.profile?.age} {user?.verified === true && <span className=" text-green-500"><BadgeCheck /></span>}  </p>
            </div>
            {
              user?.photos &&
              <KitImage loading="lazy" className=" w-full h-full object-cover border border-black/10 rounded-3xl  " src={user?.photos[0]?.url} height={300} width={300} alt="" />
              }
          </GlareHover>

          <Link href={'/profile/editprofile'} className="   glass text-white absolute   w-[50px] h-[50px]   backdrop-blur-[8px] - bottom-2 - right-2 flex justify-center items-center gap-3">  <Pencil size={21} /></Link>
          {user?.verified === false && <p className="text-lg text-gray-400 center gap-3 mt-3">Not verified yet. ⚠️ </p>}
        </div>

        <div className="mt-20 pb-10  flex-warp max-md:mt-10 max-md:px-2 px-10 text-white">
          <div className=" mx-auto flex-warp glass appear center gap-2 !justify-evenly h-[350px] max-lg:h-[400px] max-lg:flex-col w-fit  max-lg:w-full max-md:rounded-3xl max-md:p-1 max-md:py-2 p-10">
            {user?.verified === false && <GlareHover
              glareColor="#ffffff"
              glareOpacity={0.4}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={1000}
              playOnce={false}
              className="bg-transparent w-[400px]  !rounded-3xl max-lg:w-[90%] flex-col !h-full"
            >
              <Link href={'/verified'} className=" w-full px-5 flex-col h-full border-2 border-green-600 bg-green-600/30  rounded-3xl center">
                <p className=" center my-4 max-md:my-1 text-3xl max-md:text-xl gap-4">  Get Verified <BadgeCheck /></p>
                <p className=" max-md:text-xs">Not Verified yet.</p>
              </Link>
            </GlareHover>}

            <GlareHover
              glareColor="#ffffff"
              glareOpacity={0.4}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={1000}
              playOnce={false}
              className="bg-transparent w-[400px] !rounded-3xl max-lg:w-[90%] flex-col !h-full"
            >
               <ShareCom />
              {/* <div className=" w-full px-5 flex-col h-full border-2 border-blue-500 bg-blue-600/30  rounded-3xl center">
                <p className=" center my-4 max-md:my-1 text-3xl max-md:text-xl gap-4"> Share Date in. <Share /> </p>
                <p className=" max-md:text-xs text-center "> share Date in .</p>
              </div> */}
            </GlareHover>
            <GlareHover
              glareColor="#ffffff"
              glareOpacity={0.4}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={1000}
              playOnce={false}
              className="bg-transparent  w-[400px] !rounded-3xl max-lg:w-[90%] flex-col !h-full"
            >
              <Link href={'/bug'} className=" w-full px-5 flex-col h-full border-2 border-red-500 bg-red-600/30  rounded-3xl center">
                <p className=" center my-4 max-md:my-1 text-3xl max-md:text-xl gap-4"> Report Bug  <Bug /></p>
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