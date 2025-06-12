//socket.ts
// import { Server } from 'socket.io';
// import { Server as HttpServer } from 'http';

// let io: Server;

// export const initSocket = (server: HttpServer) => {
//   io = new Server(server, {
//     cors: {
//       origin: ['http://localhost:3000','https://datein.vercel.app/' ],
//       methods: ['GET', 'POST'],
//     },
//   });

//   io.on('connection', (socket) => {
//     // console.log('User connected:', socket.id);

//     socket.on('join', (chatId) => {
//       socket.join(chatId);
//       // console.log(`User joined room: ${chatId}`);
//     });

//     socket.on('disconnect', () => {
//       // console.log('User disconnected:', socket.id);
//     });
//   });

//   return io;
// };

// export const getIO = () => {
//   if (!io) throw new Error('Socket.io not initialized');
//   return io;
// }; 
  
import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

let io: Server;

const userSocketMap: Record<string, string> = {}; // { userId: socketId }

  export const getReceiverSocketId = (receiverId:string) => {
	return userSocketMap[receiverId];
};


export const initSocket = (server: HttpServer) => {
 
  io = new Server(server, {
    cors: {
      origin: ['http://localhost:3000','https://datein.vercel.app/' ],
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId as string;

     if (userId && userId !== 'undefined') {
      userSocketMap[userId] = socket.id;
      // console.log(`User connected: ${userId} (${socket.id})`);
    } else {
      // console.warn(`Invalid userId on connection: ${userId}`);
    }
 io.emit('getOnlineUsers', Object.keys(userSocketMap));
    socket.on('join', (chatId) => {
      socket.join(chatId);
      // console.log(`User joined room: ${chatId}`);
    });

    socket.on('disconnect', () => {
      // console.log('User disconnected:', socket.id);
      delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));

    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
}; 
  