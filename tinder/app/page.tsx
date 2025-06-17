import Navbar from "@/components/navbar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (session?.user?.email) {
    redirect('/match');
  }
  return (
    <>

      {session ?
        <>
          <Link className="textbase text-5xl  font-bold center h-[50vh]" href={'/match'}>Find your match</Link>
        </> : <div className=" h-[80vh] flex flex-col   text-3xl font-bold w-full ">
          <Navbar />
          <h1 className=" text-gray-500 text-center text-3xl font-bold w-full h-full flex items-center justify-center">
            Sign In to find your match
          </h1>
        </div>
      }
    </>
  );
}
