import { Request, Response } from 'express';
import prisma from '../db/prismaClient.js';

export const setLiked:any = async (req:Request,res:Response)=>{
    try {
      //  const user = await prisma.user.create({
      //   data:{
      //     name:"saurabh",
      //     email : "bisxx@"
      //   }
      //  })
      //  console.log(user)
       return res.json({success:true,message:"liked"})
    } catch (error) {
        console.log("error in addtoCartController =>>>>", error);
        return res.json({ success: false, message: "error" });
    }
}

