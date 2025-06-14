import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
const Navbar = async () => {
    const session = await getServerSession(authOptions) 
  return (
    <nav className=" w-full h-[50px] bg-[#a3a3a37d] text-white flex justify-between items-center px-4">  
     <Link href="/">
           <h1 className=" textbase font-extrabold text-2xl ">Date with.</h1>
     </Link>

      <div className="flex items-center gap-9">
      {!session ? (
      <Link href="/sign-in" className=" buttonbg p-3 text-sm rounded-full py-2">Sign In</Link>
      ) : (
        <>
          <span className=" font-bold textbase">{session?.user?.name} </span> 
        </>
      )}
      </div>
    </nav>
  )
}

export default Navbar
