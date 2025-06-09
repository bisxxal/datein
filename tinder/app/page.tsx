import UploadExample from "@/components/imageKit";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
  
export default async function Home() {
  const session = await getServerSession(authOptions) 
  return (
    <>
    
    {session ? 
    <>
    
    <Link className="textbase text-5xl  font-bold center h-[50vh]" href={'/match'}>Find your match</Link>

    <UploadExample/>


     </> :<div className=" h-[80vh] flex justify-center items-center text-3xl font-bold w-full ">
      SignIn to view Dashboard  
      </div>}
    </>
  );
}
