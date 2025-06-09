'use server'

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { TCreateProfileForm } from "@/lib/zod";
import { uploadFile } from "@/util/dal/upload";
import { getServerSession } from "next-auth";

export async function getUser() {
    try {
       const session = await getServerSession(authOptions)
        if (!session || !session.user) {
            throw new Error('User not authenticated');
        }
        const user = session.user;
        return user;
    } catch (error) {
        return JSON.parse(JSON.stringify({status: 404, message: 'Error while creating profile' })); 
    }
}

export async function getUserProfilePic() {
    try {
        const user = await getUser();
        if (!user || !user.id) {
            return JSON.parse(JSON.stringify({status: 404, message: 'Error while fetching profile picture' })); 
        }
        const profile = await prisma.user.findUnique({
            where: { id: user.id },
            select:{
              name:true,
              verified:true,
              profile:{
                select:{
                  age:true,
                  
                  photos:{
                    select:{
                      url:true
                    }
                  }
                }
              }
            }

        }) 
        return JSON.parse(JSON.stringify(profile));
    } catch (error) {
        console.error('Error fetching profile :', error);
        return JSON.parse(JSON.stringify({status: 500, message: 'Error while fetching profile picture' })); 
    }
}

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

export async function updateProfile(data:TCreateProfileForm) {
    try {
        const user = await getUser();
        if (!user || !user.id) {
            return JSON.parse(JSON.stringify({status: 404, message: 'Unauth User' })); 
        }
        const res = await prisma.user.update({
            where:{id:user.id!},
            data:{
                name: data.name,
                profile: {
                    update: {
                        bio: data.bio ,
                        age: data.age,
                        lookingFor: data.relationshipGoals,
                        batch: data.batch,
                        gender: data.gender,
                        height: Number(data?.height),
                        languages: data.languages ,
                        job: data.job,
                        livingIn: data.livingIn,
                    }
                }
            }
        })
        if(!res) {
            return JSON.parse(JSON.stringify({status: 404, message: 'Error while creating profile' })); 
        }
        console.log(res)
      return JSON.parse(JSON.stringify({status: 200, message: 'Profile created successfully' }));    
    } catch (error) {
        console.error('Error creating profile:', error);
        return JSON.parse(JSON.stringify({status: 404, message: 'Error while creating profile' }));    
    }
}
 
export async function addInterests(interests: string[]) {
  try {
    const user = await getUser()
    if (!user || !user.id) {
      return { status: 401, message: 'Unauthorized' }
    }

    // Step 1: Upsert all keywords by name (idempotent)
    const upserts = await Promise.all(
      interests.map((name) =>
        prisma.keyword.upsert({
          where: { name },
          update: {}, 
          create: { name },
        })
      )
    )

    // Step 2: Connect profile to those keywords
    const updated = await prisma.profile.update({
      where: { userId: user.id },
      data: {
        keywords: {
          set: [], // optional: remove old keywords first
          connect: upserts.map((kw) => ({ id: kw.id })),
        },
      },
    })

    return {
      status: 200,
      message: 'Interests updated successfully',
      data: updated,
    }
  } catch (error) {
    console.error('Error in addInterests:', error)
    return { status: 500, message: 'Server error updating interests' }
  }
}



export async function savePhotoUrlsToDB( formData:FormData) {
const user = await getUser();

  if(!user){
    return JSON.parse(JSON.stringify({status: 300, message: 'unauth user' }));    
  }
uploadFile(formData ,user.id)
  
}

export async function tryCatchMade (fn: () => Promise<any>) {
    try {
        return await fn();
    } catch (error) {
         return JSON.parse(JSON.stringify({status: 404, message: 'Error while creating profile' })); 
    }
}
 
 

export const likeUser = async (receiverId: string) => {
    const user = await getUser()
    if (!user || !user.id) {
      return { status: 401, message: 'Unauthorized' }
    }
  const giverId = user.id;
  if (!giverId) throw new Error('Unauthorized');
  if (giverId === receiverId) throw new Error("You can't like yourself.");

  const existingLike = await prisma.like.findUnique({
    where: {
      giverId_receiverId: {
        giverId,
        receiverId,
      },
    },
  });

  // If already liked, remove the like (unlike)
  if (existingLike) {
    await prisma.like.delete({
      where: {
        giverId_receiverId: {
          giverId,
          receiverId,
        },
      },
    });

    // Also unset 'matched' if previously matched (reverseLike matched too)
    await prisma.like.updateMany({
      where: {
        giverId: receiverId,
        receiverId: giverId,
        matched: true,
      },
      data: {
        matched: false,
      },
    });

    return { message: 'Like removed', status: 'unliked' };
  }

  // Otherwise, create the like
  const newLike = await prisma.like.create({
    data: {
      giverId,
      receiverId,
      liked: true,
    },
  });

  // Check if the reverse like exists
  const reverseLike = await prisma.like.findUnique({
    where: {
      giverId_receiverId: {
        giverId: receiverId,
        receiverId: giverId,
      },
    },
  });

  if (reverseLike?.liked) {
    await prisma.like.update({
      where: { id: newLike.id },
      data: { matched: true },
    });

    await prisma.like.update({
      where: { id: reverseLike.id },
      data: { matched: true },
    });

    return { message: "It's a match!", status: 'matched' };
  }

  return { message: 'User liked', status: 'liked' };
};



// middleware.ts
// import { withAuth } from "next-auth/middleware"
// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"

// export default withAuth(
//   function middleware(req: NextRequest) {
//     // All authenticated users are allowed — no role checks
//     return NextResponse.next()
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token, // Allow if user is logged in
//     },
//   }
// )

// // Define which routes to protect
// export const config = {
//   matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
// }
