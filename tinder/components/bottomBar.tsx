'use client' 
import { useRouter } from 'next/navigation';
import Dock from './ui/docs'; 
import { House, MessageCircle, UserRoundPen, Users } from "lucide-react";
const BottomBar = () => {
  const router = useRouter()

  const items = [
    { icon: <House className=" text-black/50" size={18} />, label: 'Match', onClick: () => router.push(`/match`) },
    { icon: <Users className=" text-black/50" size={18} />, label: 'Group', onClick: () => router.push(`/group`) },
    { icon: <MessageCircle className=" text-black/50" size={18} />, label: 'Chat', onClick: () => router.push(`/chat`) },
    { icon: <UserRoundPen className=" text-black/50" size={18} />, label: 'Profile', onClick: () => router.push(`/profile`) },
  ];
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  return (
    <div className='  fixed bottom-[15px] max-md:bottom-[10px]   z-[100] left-[5%] justify-between px-3    w-[90%] h-[60px]  rounded-3xl '>
     <Dock
        className=' glass2 bottombaranimation shadow-xl  '
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={ isMobile ? 50 : 100 }
      />
    </div>

  )
}

export default BottomBar