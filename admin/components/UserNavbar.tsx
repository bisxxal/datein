import Link from "next/link" 

const UserNavbar = async () => {

  return (
    <div className=" h-[60px] glass w-[90%] mx-auto mt-5 shadow-lg rounded-4xl  items-center text-white flex justify-between px-20 max-md:px-5">
      <Link className="text-2xl font-bold   logo2" href={'/'}>Date in.</Link>
      <div className="flex !text-2xl  font-bold logo4  items-center gap-5">
        Admin Pannel
      </div>
    </div>
  )
}

export default UserNavbar