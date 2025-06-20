'use server'
import prisma from "@/lib/prisma";
import { getUser } from "./user.action";
import { cookies } from "next/headers";
import { rateLimit } from "@/util/rateLimit";

export async function getVerified(formData: FormData) {
  // const cookieStore = await cookies();
  // const ip = cookieStore.get('user-ip')?.value || 'anonymous';

  // const rl = await rateLimit({
  //   key: ip,
  //   limit: 3,
  //   windowInSeconds: 60,
  // });

  // if (!rl.success) {
  //   console.log(`Rate limit exceeded. Try again in ${rl.retryAfter}s.`);
  //   return JSON.parse(JSON.stringify({ status: 429, message: `Rate limit exceeded. Try again in ${rl.retryAfter}s.` }));
  // }
  const user = await getUser();
  if (!user) {
    return JSON.parse(JSON.stringify({ status: 300, message: 'unauth user' }));
  }
  const roll = formData.get('roll') as string;
  const verify = await prisma.verified.create({
    data: {
      userId: user.id,
      rollNo: roll
    },
  })
  // console.log(verify)
  if (!verify) {
    return JSON.parse(JSON.stringify({ status: 300, message: 'error in saving' }));
  }
  return JSON.parse(JSON.stringify({ status: 200, message: 'success', }));
}

export const reportUser = async (receiverId: string, reason: string , giverId :string , chatId: string ) => {
  try {
    // console.log(receiverId, giverId, chatId, 'reportUser');
    const user = await getUser()
    if (!user || !user.id) {
      return { status: 401, message: 'Unauthorized' }
    }
    const res = await prisma.reportedUsers.create({
      data: {
        reporterId: user.id,
        reason: reason,
        reportedId: receiverId,
      },
    });
    const existingLike = await prisma.like.findFirst({
        where: {
          // giverId_receiverId: {
          //   giverId,
          //   receiverId,
          // },
          OR:[
            { giverId, receiverId },
            { giverId: receiverId, receiverId: giverId }
          ]
        },
      });
      if (existingLike) {
        console.log('lalalal')
          await prisma.like.delete({
             where: {
                  id: existingLike.id,
                },
          });
        }
    if(chatId!== undefined && res){
      const isChat = await prisma.chat.findUnique({
        where: {
          id: chatId,
        },
      });
      if (!isChat) {
        return JSON.parse(JSON.stringify({ status: 200, message: "User reported successfully" }));
      }
      const res = await prisma.chat.delete({
        where: {
          id: chatId,
        },
      });
      console.log('Chat deleted successfully' , res);
      return JSON.parse(JSON.stringify({ status: 200, message: "User reported successfully" }));
    }
    if (res) {
      return JSON.parse(JSON.stringify({ status: 200, message: "User reported successfully" }));
    } else {
      return JSON.parse(JSON.stringify({ status: 300, message: "Failed to report user" }));
    }
  } catch (error) {
    console.error("Error reporting user:", error);
    return JSON.parse(JSON.stringify({ status: 500, message: "Server error", error }));
  }
}

export const reportBug = async (formData: FormData) => {
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
      return JSON.parse(JSON.stringify({ status: 429, message: `Rate limit exceeded. Try again in ${rl.retryAfter}s.` }));
    }

    const description = formData.get('description') as string;
    const title = formData.get('titel') as string;
    const user = await getUser()
    if (!user || !user.id || !title || !description) {
      return { status: 401, message: 'Unauthorized' }
    }

    const reports = await prisma.bug.create({
      data: {
        titel: title,
        description: description,
        userId: user.id
      }
    });
    if (reports) {
      return JSON.parse(JSON.stringify({ status: 200, message: "Bug reported successfully" }));
    } else {
      return JSON.parse(JSON.stringify({ status: 300 }));
    }
  } catch (error) {
    return JSON.parse(JSON.stringify({ status: 500, message: "Server error", error }));
    return [];
  }
}