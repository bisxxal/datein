'use client'
import Link from 'next/link';
import { RiHome2Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { IoChatboxOutline, IoChatbubbleOutline, IoSettingsOutline } from "react-icons/io5";
import { usePathname, useRouter } from 'next/navigation';
import Dock from './ui/docs';

const BottomBar = () => {
  const router = useRouter()
    const parmas = usePathname()
    
    
    const items = [
    { icon: <RiHome2Line size={18} />, label: 'Match', onClick: () => router.push(`/match`) },
    { icon: <IoSettingsOutline size={18} />, label: 'Settings', onClick: () => router.push(`/profile/settings`) },
    { icon: <IoChatbubbleOutline size={18} />, label: 'Chat', onClick: () => router.push(`/chat`) },
    { icon: <FaRegUser size={18} />, label: 'Profile', onClick: () => router.push(`/profile`) },
  ];
  return (
    <div className='  fixed top-[92vh]  z-[100] left-[5%] justify-between px-3    w-[90%] h-[60px]  rounded-3xl '>
      {/* <Link className={` ${parmas === '/match' ? ' textbase bg-[#DCE4FC] ' : ' text-gray-200 bg-[#00000000]  '} text-2xl w-[40px] center h-[40px] rounded-full  `} href={'/match'}><RiHome2Line /></Link>
      <Link className={` ${parmas === '/user/matchs' ? ' textbase bg-[#DCE4FC] ' : ' text-gray-200 bg-[#00000000]  '} text-2xl w-[40px] center h-[40px] rounded-full  `} href={'/user/matchs'}>👩‍❤️‍👨</Link>
      <Link className={` ${parmas === '/user/chat' ? ' textbase bg-[#DCE4FC] ' : ' text-gray-200 bg-[#00000000]  '} text-2xl w-[40px] center h-[40px] rounded-full  `} href={'/user/chat'}><IoChatbubbleOutline /></Link>
      <Link className={` ${parmas == '/user/profile' ? ' textbase bg-[#DCE4FC] ' : ' text-gray-200 bg-[#00000000]  '} text-2xl w-[40px] center h-[40px] rounded-full  `} href={'/user/profile'}><FaRegUser /></Link> */}

        <Dock
          className=' bg-[#cccccc54] sidebarb  z-[50 backdrop-blur-[20px] shadow-xl !border-none black/10 '
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={100}
      />
      </div>
    
  )
}

export default BottomBar