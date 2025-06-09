'use client'; 
import { signIn } from "next-auth/react"; 
import { FaGoogle } from "react-icons/fa";
 
const SignInButton = ({text}:{text:string}) => {
  return (
    <div className=" cursor-pointer flex justify-center items-center h-screen w-full">
    
      <button className="cursor-pointer center gap-3 text-xl px-8 py-3 rounded-full buttonbg " onClick={() => signIn('google')}><FaGoogle />{text}</button>
    </div>
  );
};

export default SignInButton;