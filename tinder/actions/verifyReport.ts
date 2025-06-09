'use server'

import prisma from "@/lib/prisma";
import { getUser } from "./user.action";

export async function getVerified( formData:FormData) {
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
  console.log(verify)
  if(!verify){
    return JSON.parse(JSON.stringify({status: 300, message: 'error in saving' }));    
  }
  return JSON.parse(JSON.stringify({status: 200, message: 'success',})); 
}
