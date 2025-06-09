import express from "express";
import { AllMatches, getMessages, sendMessage } from "../controller/chatController.js";
const chat = express.Router();
chat.get("/getallmatch", AllMatches);
chat.get("/getmessages", getMessages);
chat.post("/sendmessage", sendMessage);
export default chat;
