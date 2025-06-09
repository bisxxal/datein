// import { Server } from 'socket.io';
// import { Server as HttpServer } from 'http';

// let io: Server;

// export const initSocket = (server: HttpServer) => {
//   io = new Server(server, {
//     cors: {
//       origin: '*',
//       methods: ['GET', 'POST'],
//     },
//   });

//   io.on('connection', (socket) => {
//     console.log('🟢 User connected:', socket.id);

//     socket.on('join', (chatId: string) => {
//       socket.join(chatId);
//       console.log(`🔵 User joined chat room: ${chatId}`);
//     });

//     socket.on('disconnect', () => {
//       console.log('🔴 User disconnected:', socket.id);
//     });
//   });

//   return io;
// };

// export const getIO = (): Server => {
//   if (!io) {
//     throw new Error('Socket.io not initialized. Call initSocket first.');
//   }
//   return io;
// };


// socket.ts
import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

let io: Server;

export const initSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join', (chatId) => {
      socket.join(chatId);
      console.log(`User joined room: ${chatId}`);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
};
