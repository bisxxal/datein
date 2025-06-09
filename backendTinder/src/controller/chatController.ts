import { Request, Response } from 'express';
import prisma from '../db/prismaClient.js';
import { getIO } from '../socket.js';
// import { getIO } from '../socket';


export const AllMatches:any = async (req:Request,res:Response)=>{
    try {
        const { userId } = req.query;

        if (!userId || (Array.isArray(userId) && userId.length === 0)) {
            return res.json({ success: false, message: "userId is required" });
        }

        // Ensure userId is a string
        const userIdStr = Array.isArray(userId) ? userId[0] : userId;

        const matches = await prisma.like.findMany({
            where: {
                OR: [
                    { giverId: userIdStr },
                    { receiverId: userIdStr }
                ],
                matched: true
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
        console.log(matches)
       return res.json({ success: true , matches });
    } catch (error) {
        console.log("error in AllMatches =>>>>", error);
        return res.json({ success: false, message: "error" });
    }
} 

export const createOrGetChat = async (userAId: string, userBId: string) => {
  // Check if a 1-on-1 chat already exists
  const existingChat = await prisma.chat.findFirst({
    where: {
      participants: {
        some: { userId: userAId },
      },
      AND: {
        participants: {
          some: { userId: userBId },
        },
      },
    },
    include: {
      participants: true,
    },
  });

  if (existingChat) return existingChat;

  // Create a new chat
  const chat = await prisma.chat.create({
    data: {
      participants: {
        create: [
          { user: { connect: { id: userAId } } },
          { user: { connect: { id: userBId } } },
        ],
      },
    },
    include: {
      participants: true,
    },
  });

  return chat;
}; 

export const sendMessage =  async (req: Request, res: Response) => {
  const { senderId, chatId, content } = req.body;

    console.log(' sendMessage agin')
  if (!senderId || !chatId || !content) {
    return res.status(400).json({ error: 'senderId, chatId, and content are required' });
  }

  try {
    // Optional: Check if user is a participant in the chat
    const participant = await prisma.chatParticipant.findFirst({
      where: {
        userId: senderId,
        chatId,
      },
    });

    if (!participant) {
      return res.status(403).json({ error: 'User is not a participant in this chat' });
    }

    // Create the message
    const message = await prisma.message.create({
      data: {
        senderId,
        chatId,
        content,
      },
      include: {
        sender: {
          select: { id: true, name: true },
        },
      },
    });

      const io = getIO();
    io.to(chatId).emit('new_message', message);

    return res.status(201).json({ message });
  } catch (error) {
    console.error('Error sending message:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


// export const sendMessage =  async (req: Request, res: Response) => {
//   const { senderId, receiverId, content } = req.body;


//   if (!senderId || !receiverId || !content) {
//     return res.status(400).json({ error: 'senderId, chatId, and content are required' });
//   }
  
// try {
//     const existingChat = await prisma.chat.findFirst({
//         where: {
//         participants: {
//             some: { userId: senderId },
//         },
//         AND: {
//             participants: {
//             some: { userId: receiverId },
//             },
//         },
//         },
//         include: {
//         participants: true,
//         },
//     });

//   if (!existingChat)  {
//       const chat = await prisma.chat.create({
//           data: {
//               participants: {
//                   create: [
//                       { user: { connect: { id: senderId } } },
//                       { user: { connect: { id: receiverId } } },
//                     ],
//                 },
//             },
//             include: {
//                 participants: true,
//             },
//         });
        
        
//         const participant = await prisma.chatParticipant.findFirst({
//             where: {
//                 userId: senderId,
//                 chatId:chat.id,
//             },
//         });
        
//         if (!participant) {
//             return res.status(403).json({ error: 'User is not a participant in this chat' });
//         }
        
//         // Create the message
//         const message = await prisma.message.create({
//             data: {
//                 senderId,
//                 chatId:chat.id,
//                 content,
//             },
//         });
//         return res.status(201).json({ message });
//     }

 
//         const participant = await prisma.chatParticipant.findFirst({
//             where: {
//                 userId: senderId,
//                 chatId:existingChat.id,
//             },
//         });
        
//         if (!participant) {
//             return res.status(403).json({ error: 'User is not a participant in this chat' });
//         }
        
//         // Create the message
//         const message = await prisma.message.create({
//             data: {
//                 senderId,
//                 chatId:existingChat.id,
//                 content,
//             },
//         });
//         return res.status(201).json({ message });

 

//   } catch (error) {
//     console.error('Error sending message:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// }

 
// export const sendMessage = async (req: Request, res: Response) => {
//   const { senderId, receiverId, content } = req.body;

//   if (!senderId || !receiverId || !content) {
//     return res.status(400).json({ error: 'senderId, receiverId, and content are required' });
//   }

//   try {
//     // 1. Find existing chat between both users
//     let chat = await prisma.chat.findFirst({
//       where: {
//         participants: {
//           some: {
//             OR: [
//               { userId: senderId },
//               { userId: receiverId }
//             ]
//           },
//         },
//       },
//     });

//     // 2. Create chat if not found
//     if (!chat) {
//       chat = await prisma.chat.create({
//         data: {
//           participants: {
//             create: [
//               { user: { connect: { id: senderId } } },
//               { user: { connect: { id: receiverId } } },
//             ],
//           },
//         },
//       });
//     }

//     // 3. Validate sender is a participant (just for safety; usually true)
//     const isParticipant = await prisma.chatParticipant.findFirst({
//       where: {
//         userId: senderId,
//         chatId: chat.id,
//       },
//     });

//     if (!isParticipant) {
//       return res.status(403).json({ error: 'User is not a participant in this chat' });
//     }

//     // 4. Create the message
//     const message = await prisma.message.create({
//       data: {
//         senderId,
//         chatId: chat.id,
//         content,
//       },
//     });

   
// // ...inside sendMessage
//   const io = getIO();
//         io.to(chat.id).emit('new_message', {
//         chatId: chat.id,
//         senderId,
//         content,
//         createdAt: message.createdAt,
//         });

//     return res.status(201).json({ message });

//   } catch (error) {
//     console.error('Error sending message:', error);
//     return res.status(500).json({ error: error });
//   }
// };

 
export const getMessages = async (req: Request, res: Response) => {
  const { chatId } = req.query;

  if (!chatId || typeof chatId !== 'string') {
    console.log('not a string', chatId);
    return res.status(400).json({ error: 'chatId is required and must be a string' });
  }

  console.log('fetching message agin')

  try {
    const messages = await prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: 'asc' },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return res.status(200).json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
