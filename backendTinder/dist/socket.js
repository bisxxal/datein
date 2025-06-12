//socket.ts
import { Server } from 'socket.io';
let io;
export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: ['http://localhost:3000', 'https://datein.vercel.app/'],
            methods: ['GET', 'POST'],
        },
    });
    io.on('connection', (socket) => {
        // console.log('User connected:', socket.id);
        socket.on('join', (chatId) => {
            socket.join(chatId);
            // console.log(`User joined room: ${chatId}`);
        });
        socket.on('disconnect', () => {
            // console.log('User disconnected:', socket.id);
        });
    });
    return io;
};
export const getIO = () => {
    if (!io)
        throw new Error('Socket.io not initialized');
    return io;
};
