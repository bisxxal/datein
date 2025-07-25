'use client' 
import { useRouter } from 'next/navigation';
import Dock from './ui/docs'; 
import { BadgeCheck, Bug, Home, Shield } from 'lucide-react';
const BottomBar = () => {
  const router = useRouter()
  const items = [
    { icon: <Home className=" text-black/50" size={18} />, label: 'Home', onClick: () => router.push(`/`) },
    { icon: <BadgeCheck className=" text-black/50" size={18} />, label: 'Verification', onClick: () => router.push(`/verification`) },
    { icon: <Shield className=" text-black/50" size={18} />, label: 'Report', onClick: () => router.push(`/report`) },
    { icon: <Bug className=" text-black/50" size={18} />, label: 'Bug', onClick: () => router.push(`/bug`) },
  ];
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  return (
    <div className=' fixed bottom-[25px] z-[100] left-[5%] justify-between px-3    w-[90%] h-[60px]  rounded-3xl '>
      {/* <Dock
        className=' glass2 z-[50   shadow-xl  '
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={100}
      /> */}
       <Dock
        className=' glass2   shadow-xl  '
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={ isMobile ? 50 : 100 }
      />
    </div>

  )
}

export default BottomBar