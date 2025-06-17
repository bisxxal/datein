'use client'
import { RiHome2Line } from "react-icons/ri";
import { IoBugSharp } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import Dock from './ui/docs';
import { MdOutlineVerified, MdReport } from "react-icons/md";
const BottomBar = () => {
  const router = useRouter()

  const items = [
    { icon: <RiHome2Line className=" text-black/50" size={18} />, label: 'Homs', onClick: () => router.push(`/home`) },
    { icon: <MdOutlineVerified className=" text-black/50" size={18} />, label: 'Verification', onClick: () => router.push(`/verification`) },
    { icon: <MdReport className=" text-black/50" size={18} />, label: 'Report', onClick: () => router.push(`/report`) },
    { icon: <IoBugSharp className=" text-black/50" size={18} />, label: 'Bug', onClick: () => router.push(`/bug`) },
  ];
  return (
    <div className=' fixed top-[92vh] z-[100] left-[5%] justify-between px-3    w-[90%] h-[60px]  rounded-3xl '>
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