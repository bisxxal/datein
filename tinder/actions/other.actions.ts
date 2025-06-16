'use server'

import prisma from "@/lib/prisma";
import { getUser } from "./user.action";
import { cookies } from "next/headers";
import { rateLimit } from "@/util/rateLimit";

export async function getVerified( formData:FormData) {
  const cookieStore = await cookies();  
  const ip = cookieStore.get('user-ip')?.value || 'anonymous';

  const rl = await rateLimit({
    key: ip,
    limit: 3,
    windowInSeconds: 60,
  });

  if (!rl.success) {
    console.log(`Rate limit exceeded. Try again in ${rl.retryAfter}s.`);
    return JSON.parse(JSON.stringify({status: 429, message: `Rate limit exceeded. Try again in ${rl.retryAfter}s.`}));
  }
const user = await getUser();
  if(!user){
    return JSON.parse(JSON.stringify({status: 300, message: 'unauth user' }));    
  }
  const roll = formData.get('roll') as string;
  const verify = await prisma.verified.create({
    data: {
      userId: user.id,
      rollNo:roll
    },
  })
  // console.log(verify)
  if(!verify){
    return JSON.parse(JSON.stringify({status: 300, message: 'error in saving' }));    
  }
  return JSON.parse(JSON.stringify({status: 200, message: 'success',})); 
}

export const reportUser = async (receiverId: string , reason:string ) => {
  try {
     const user = await getUser()
    if (!user || !user.id) {
      return { status: 401, message: 'Unauthorized' }
    }
    // console.log(receiverId)
    const res = await prisma.reportedUsers.create({
      data: {
        reporterId: user.id,
        reason: reason,
        reportedId: receiverId,
      },
    });
    if (res) {
      return JSON.parse(JSON.stringify({ status: 200, message: "User reported successfully" }));
    } else {
      return JSON.parse(JSON.stringify({ status: 300, message: "Failed to report user" }));
    }
  } catch (error) {
    return JSON.parse(JSON.stringify({ status: 500, message: "Server error", error }));
  }
}

export const reportBug = async (formData:FormData) => {
  try {

    const cookieStore = await cookies();  
    const ip = cookieStore.get('user-ip')?.value || 'anonymous';
    const rl = await rateLimit({
      key: ip,
      limit: 3,
      windowInSeconds: 60,
    });

    if (!rl.success) {
      console.log(`Rate limit exceeded. Try again in ${rl.retryAfter}s.`);
      return JSON.parse(JSON.stringify({status: 429, message: `Rate limit exceeded. Try again in ${rl.retryAfter}s.`}));
    }

    const description = formData.get('description') as string;
    const title = formData.get('titel') as string;
      const user = await getUser()
    if (!user || !user.id || !title || !description) {
      return { status: 401, message: 'Unauthorized' }
    }

    const reports = await prisma.bug.create({
      data:{
        titel:title,
        description:description,
        userId:user.id
      }
    });
    if (reports) {
      return JSON.parse(JSON.stringify({ status: 200, message: "User reported successfully" }));
    } else {
      return JSON.parse(JSON.stringify({ status: 300 }));
    }
  } catch (error) {
    return JSON.parse(JSON.stringify({ status: 500, message: "Server error", error }));
    return [];
  }
}