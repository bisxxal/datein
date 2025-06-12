'use client'
import { RiHome2Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import {   IoChatbubbleOutline, IoSettingsOutline } from "react-icons/io5";
import {  useRouter } from 'next/navigation';
import Dock from './ui/docs';

const BottomBar = () => {
  const router = useRouter()
    
    const items = [
    { icon: <RiHome2Line className=" text-black/50" size={18} />, label: 'Match', onClick: () => router.push(`/match`) },
    { icon: <IoSettingsOutline className=" text-black/50" size={18} />, label: 'Settings', onClick: () => router.push(`/profile/settings`) },
    { icon: <IoChatbubbleOutline className=" text-black/50" size={18} />, label: 'Chat', onClick: () => router.push(`/chat`) },
    { icon: <FaRegUser className=" text-black/50" size={18} />, label: 'Profile', onClick: () => router.push(`/profile`) },
  ];
  return (
    <div className='  fixed top-[92vh] z-[100] left-[5%] justify-between px-3    w-[90%] h-[60px]  rounded-3xl '>
        <Dock
          className=' glass2 z-[50   shadow-xl  '
          items={items}
          panelHeight={68}
          baseItemSize={50}
          magnification={100}
        />
      </div>
    
  )
}

export default BottomBar