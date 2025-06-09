'use server'

import prisma from "@/lib/prisma" 
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { shuffleArray } from "@/util/algoLogic"

export const AllPublicUsers = async () => {
    try {
      const limit = 3
      console.log('featching agin' )
       const session = await getServerSession(authOptions) 
        if (!session || !session.user) {
          console.log('Not authorized user');
           return JSON.parse(JSON.stringify({status: 500, message: 'Not authorized user' })); 
          }
          const user = await prisma.user.findUnique({
            where: {
              id: session?.user.id!
            },
            select:{
              likesGiven:{
                select:{
                  receiverId: true,
                },
              },
              profile:{
                select:{
                  lookingFor: true,
                  keywords:{
                    select:{
                      name: true
                    }
                  }
                }
              }
            }
          })
  const likedUserIds = user?.likesGiven.map(like => like.receiverId) || [];
   
  const [allUsers] = await prisma.$transaction([
      prisma.user.findMany({
      // skip: (page - 1) * limit,  
      take: limit,
      where:{
          id: {
          notIn: [session.user.id, ...likedUserIds],
      },
      },
      // orderBy: {
      //   createdAt: 'desc',
      // },
      select:{
        id: true,
        name: true,
        createdAt: true,
        profile:{
            select:{
                job: true,
                batch: true,
                location: true,
                livingIn: true,
                lookingFor: true,
                height: true,
                bio: true,
                age: true,
                languages:true,
                photos:{
                  select:{
                    url: true,
                  }
                },
                keywords:{
                    select:{
                        name: true
                    }
                }
            }
        }
      }
    }),
    // prisma.user.count({
    //    where:{
    //       id: {
    //       notIn: [session.user.id, ...likedUserIds],
    //   },
    //   },
    // })

  ])
        //  const shuffled = shuffleArray(allUsers);
        return JSON.parse(JSON.stringify({user ,shuffled:allUsers }))
        // return JSON.parse(JSON.stringify({user ,allUsers , total}))

    } catch (error) {
        
    }
}
 
export const UnseenUsers = async () => {
  try {
    const session = await getServerSession(authOptions) 
 
        if (!session || !session.user) {
          console.log('Not authorized user');
           return JSON.parse(JSON.stringify({status: 500, message: 'Not authorized user' })); 
          }

    const user = await prisma.user.findFirst({
      where: {
        id: session?.user.id!  
      },
    })
 
    const unseenUsers = await prisma.user.findMany({
      where: {
        id: {
          notIn: [user?.id!] // Exclude seen and self
        },
        NOT: {
          //  gender:user?.gender
        }
      },
      select:{
                id: true,
                name: true,
                createdAt: true,
                profile:{
                    select:{
                        bio: true,
                        age: true,
                        photos:{
                            select:{
                                url: true,
                            }
                        },
                        keywords:{
                            select:{
                                name: true
                            }
                        }
                    }
                }
            }
    })

    
    // const shuffled = unseenUsers.sort(() => 0.5 - Math.random());
    const shuffled = shuffleArray(unseenUsers);
        return JSON.parse(JSON.stringify(shuffled))

  } catch (error) {
    console.error("Error fetching unseen users:", error)
    return []
  }
}
