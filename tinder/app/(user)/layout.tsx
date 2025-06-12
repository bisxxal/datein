import BottomBar from "@/components/bottomBar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserNavbar from "./_components/UserNavbar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions) 
  if(!session) {
    redirect("/sign-in");
  }
  return (
    <div className=" relative ">
        {/* <UserNavbar/> */}
      {children}
       <BottomBar/>
    </div>
  );
}
