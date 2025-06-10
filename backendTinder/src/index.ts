// import express from 'express'
// import cors from 'cors'
// import dotenv from 'dotenv'  
// import like from './router/like.js'; 
// import chat from './router/chart.js'; 
// import { createServer } from 'http';
// import { initSocket } from './socket.js';

// const app = express();
// dotenv.config();

// const httpServer = createServer(app);

// app.use(express.json())
// app.use(cors({
//   origin: ['http://localhost:3000','https://datein.vercel.app/' ],// Adjust this to your frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true, // Allow cookies to be sent with requests
// })) 

// app.use("/api/likes" ,like) 

// app.use("/api/chart" ,chat) 
// const port =8000
// initSocket(httpServer);
// httpServer.listen(port, () => { 
//   console.log(`🚀 Server running on on ${port}`);
// });


import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';  
import like from './router/like.js'; 
import chat from './router/chart.js'; 
import { createServer } from 'http';
import { initSocket } from './socket.js';

const app = express();
dotenv.config();

const httpServer = createServer(app);

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://datein.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use("/api/likes", like);
app.use("/api/chart", chat);

const port = process.env.PORT || 8000;

initSocket(httpServer);

httpServer.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
