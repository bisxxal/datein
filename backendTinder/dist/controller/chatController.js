import prisma from '../db/prismaClient.js';
import { getIO } from '../socket.js';
export const sendMessage = async (req, res) => {
    const { senderId, chatId, content } = req.body;
    console.log(' sendMessage agin');
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
    }
    catch (error) {
        console.error('Error sending message:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
export const getMessages = async (req, res) => {
    const { chatId } = req.query;
    const userId = req.query.userId;
    if (!chatId || typeof chatId !== 'string' || userId === undefined || typeof userId !== 'string') {
        console.log('not a string', chatId);
        return res.status(400).json({ error: 'chatId is required and must be a string' });
    }
    console.log('fetching message agin');
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
        const user = await prisma.chatParticipant.findFirst({
            where: {
                chatId,
                NOT: {
                    userId: userId,
                }
            },
            select: {
                user: {
                    select: {
                        name: true,
                        id: true,
                    }
                }
            }
        });
        return res.status(200).json({ messages, user });
    }
    catch (error) {
        console.error('Error fetching messages:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
