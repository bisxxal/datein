import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import like from './router/like.js';
import chat from './router/chart.js';
import { createServer } from 'http';
import { initSocket } from './socket.js';
// import { initSocket } from './socket';
const app = express();
dotenv.config();
const httpServer = createServer(app);
app.use(express.json());
app.use(cors());
app.use("/api/likes", like);
app.use("/api/chart", chat);
app.get('/', (req, res) => {
    const { data } = req.body;
    console.log('hello', data);
});
const port = 8000;
initSocket(httpServer);
httpServer.listen(port, () => {
    console.log(`🚀 Server running on on ${port}`);
});
