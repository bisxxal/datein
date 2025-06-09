'use server'

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"

export const getMatches = async () => {
    try {
        const session = await getServerSession(authOptions) 
                if (!session || !session.user) {
                  console.log('Not authorized user');
                   return JSON.parse(JSON.stringify({status: 500, message: 'Not authorized user' })); 
                  }

        const matches = await prisma.like.findMany({
            where: {
                OR: [
                    { giverId: session.user.id },
                    { receiverId: session.user.id }
                ],
                // matched: true

            },
            include: {
                giver: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                },
                receiver: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                }
            },
            
        })
        if(session.user.id && matches){
            return JSON.parse(JSON.stringify({matches , userId: session.user.id}));
        }
// console.log(matches, 'matches data');
    } catch (error) {
        
    }
}

export const getAllChats = async () => {
    try {
         const session = await getServerSession(authOptions) 
        if (!session || !session.user) {
            console.log('Not authorized user');
            return JSON.parse(JSON.stringify({status: 500, message: 'Not authorized user' })); 
            } 
        const chats = await prisma.chatParticipant.findMany({
            where:{
                userId: session.user.id
            },
            select:{
                chatId: true,
                chat: {
                    select:{
                        messages:{
                               orderBy: {
                                createdAt: 'desc'
                            },
                            select:{
                                content: true,
                                createdAt: true,
                            },
                            take: 1
                        },
                         participants: {
                            select: {
                                user: {
                                    select: {
                                        name: true,
                                        image: true,
                                        id: true
                                    }
                                }
                            }
                        },
                    }
                  
                }
            }
            // }
        })
        // console.log('session user id', chats);
        return JSON.parse(JSON.stringify({chats , userId: session.user.id}));
    } catch (error) {
        console.error('Error fetching all chats:', error);
        return JSON.parse(JSON.stringify({status: 500, message: 'Error fetching all chats' }));
    }
}

export const createChartparticipent = async(receiverId:string)=>{
    try {
         const session = await getServerSession(authOptions) 
        if (!session || !session.user) {
        return JSON.parse(JSON.stringify({status: 500, message: 'Not authorized user' })); 
        } 

        const chat = await prisma.chat.create({
          data: {
              participants: {
                  create: [
                      { user: { connect: { id: session?.user?.id } } },
                      { user: { connect: { id: receiverId } } },
                    ],
                },
            }, 
        });

        return JSON.parse(JSON.stringify({chatId: chat.id}));

    } catch (error) {
        
    }
}

export const deleteAllMessages = async (chatId:string)=>{
    try {
        const res = await prisma.message.deleteMany({
            where:{
                chatId
            }
        })
        if(!res){
            return JSON.parse(JSON.stringify({res: false  }));
        }
         return JSON.parse(JSON.stringify({res:true}));
    } catch (error) {
        
    }
}