//@ts-nocheck
import express, { Router } from "express"; 
import { setLiked } from "../controller/likedContoller.js";
const like:Router = express.Router()

like.get("/setlike", setLiked ) 
 
export default like 