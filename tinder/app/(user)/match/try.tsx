'use client';
import { useSession } from "next-auth/react";
import axios from "axios";
const Try = () => {
   const url = process.env.NEXT_PUBLIC_BACKEND_URL
  const { data , status ,  } = useSession();
  const handelFetch = async () => {

    if(data && data.user) {
        console.log('requesing ')
 
        console.log('data', data.user.id);
         const res = await axios.get(`${url}/api/chart/getallmatch`, {params: {userId: data.user.id,  }});

        console.log('res', res.data);
    }
  }
  return <div>
    <button onClick={()=>handelFetch()} className=" buttonbg p-4 ">Click</button>
  </div>;
};

export default Try;
