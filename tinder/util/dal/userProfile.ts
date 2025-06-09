import { getUser } from "@/actions/user.action";
import prisma from "@/lib/prisma";

export async function getUserProfile() {
     try {
        const user = await getUser();
        if (!user || !user.id) {
            return JSON.parse(JSON.stringify({status: 404, message: 'Error while fetching profile picture' })); 
        }
        const profile = await prisma.user.findUnique({
          where:{id:user.id},
          select:{
            name:true,
            profile:{
               select:{
                photos: { select: { url: true } },
                keywords: {select: { name: true }},
                bio: true,
                age: true,
                lookingFor: true,
                gender: true,
                height: true,
                batch: true,
                job: true,
                livingIn: true,
                languages: true,
            }
            }
          }
        })
        return JSON.parse(JSON.stringify(profile));
    } catch (error) {
        console.error('Error fetching profile picture:', error);
        return JSON.parse(JSON.stringify({status: 404, message: 'Error while fetching profile picture' })); 
    }
}
