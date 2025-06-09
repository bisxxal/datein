'use client';
import { useSession } from "next-auth/react";
import axios from "axios";
const Try = () => {
  const { data , status ,  } = useSession();
  const handelFetch = async () => {

    if(data && data.user) {
        console.log('requesing ')
 
        console.log('data', data.user.id);
         const res = await axios.get('http://localhost:8000/api/chart/getallmatch', {params: {userId: data.user.id,  }});

        console.log('res', res.data);
    }
  }
  return <div>
    <button onClick={()=>handelFetch()} className=" buttonbg p-4 ">Click</button>
  </div>;
};

export default Try;
