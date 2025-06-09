'use client'
import Dock from "@/components/ui/docs";
import { FaRegUser } from "react-icons/fa6";
import { RiHome2Line } from "react-icons/ri";
import { IoChatboxOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";

  const items = [
    { icon: <RiHome2Line size={18} />, label: 'Home', onClick: () => alert('Home!') },
    { icon: <IoSettingsOutline size={18} />, label: 'Settings', onClick: () => alert('Setting!') },
    { icon: <FaRegUser size={18} />, label: 'Profile', onClick: () => alert('Profile!') },
    { icon: <IoChatboxOutline size={18} />, label: 'Chat', onClick: () => alert('Chat!') },
  ];
export default function Home() {
  return (
  <div>
   <Dock
        className=' bg-[#96939378] sidebarb  z-[50 backdrop-blur-[20px] shadow-xl !border-none black/10 '
    items={items}
    panelHeight={68}
    baseItemSize={50}
    magnification={100}
  />

  </div>
  );
}
