'use server'
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redis } from '@/lib/redis'
import { shuffleArray } from "@/util/algoLogic"
import { cookies } from "next/headers"
import { rateLimit } from "@/util/rateLimit"


// export const AllPublicUserActions = async (page: number) => {
//   try {
//     const limit = 10;
//     const session = await getServerSession(authOptions);
//     if (!session || !session.user) {
//       return { status: 500, message: 'Not authorized user' };
//     }

//     const cacheKey = `publicUserList:${session.user.id}`;
//     let cachedUserIdList = await redis.get(cacheKey);

//     // Step 1: Get base user context
//     const user = await prisma.user.findUnique({
//       where: { id: session.user.id },
//       select: {
//         id: true,
//         likesGiven: { select: { receiverId: true } },
//         reported: { select: { reportedId: true } },
//         profile: { select: { gender: true } },
//       },
//     });

//     const reportedUserIds = user?.reported?.map(r => r.reportedId) || [];
//     const likedUserIds = user?.likesGiven?.map(l => l.receiverId) || [];
//     const oppositeGender = user?.profile?.gender === 'male' ? 'female' : 'male';

//     // Step 2: Get or build cached ID list
//     let filteredUserIds: string[] = [];

//     if (cachedUserIdList) {
//       console.log('Cache hit');
//       filteredUserIds = JSON.parse(cachedUserIdList);
//     } else {
//       console.log('Building ID list and caching');
//       const ids = await prisma.user.findMany({
//         where: {
//           id: {
//             notIn: [session.user.id, ...likedUserIds, ...reportedUserIds],
//           },
//           // You can re-enable these filters as needed
//           // profile: { gender: oppositeGender },
//         },
//         select: { id: true },
//         orderBy: { createdAt: 'desc' },
//       });

//       filteredUserIds = ids.map(u => u.id);
//       await redis.set(cacheKey, JSON.stringify(filteredUserIds), 'EX', 6000);
//     }

//     // Step 3: Paginate in-memory
//     const start = (page - 1) * limit;
//     const paginatedIds = filteredUserIds.slice(start, start + limit);
//     const total = filteredUserIds.length;

//     // Step 4: Fetch full user info
//     const allUsers = await prisma.user.findMany({
//       where: {
//         id: { in: paginatedIds },
//       },
//       select: {
//         id: true,
//         name: true,
//         verified: true,
//         createdAt: true,
//         photos: {
//           take: 6,
//           select: { url: true },
//         },
//         profile: {
//           select: {
//             job: true,
//             batch: true,
//             location: true,
//             livingIn: true,
//             lookingFor: true,
//             height: true,
//             bio: true,
//             age: true,
//             languages: true,
//             keywords: { select: { name: true } },
//           },
//         },
//       },
//     });

//     return JSON.parse(JSON.stringify({
//       user,
//       shuffled: allUsers,
//       total,
//     }));
//   } catch (error) {
//     console.error('AllPublicUserActions error:', error);
//     return { status: 500, message: 'Internal Server Error' };
//   }
// };

export const AllPublicUserActions = async (page: number) => {
  try {
    console.log('featching agin', page)
    const limit = 10;
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return JSON.parse(JSON.stringify({ status: 500, message: 'Not authorized user' }));
    }
    //  const cookieStore = await cookies();
    //   const ip = cookieStore.get('user-ip')?.value || 'anonymous';

    //   const rl = await rateLimit({
    //     key: ip,
    //     limit: 3,
    //     windowInSeconds: 60,
    //   });

    //   if (!rl.success) {
    //     console.log(`Too many request. Try again in ${rl.retryAfter}s.`);
    //     return JSON.parse(JSON.stringify({ status: 429, message: `Rate limit exceeded. Try again in ${rl.retryAfter}s.` }));
    //   }

    const user = await prisma.user.findUnique({
      where: {
        id: session?.user.id!,
      },
      select: {
        id: true,
        likesGiven: {
          select: {
            receiverId: true,
          },
        },
        profile: {
          select: {
            gender: true,
            keywords: {
              select: {
                name: true
              }
            }
          }
        },
        reported: {
          select: {
            reportedId: true
          }
        }
      }
    })

    const reportedUserIds = user?.reported?.map((u: { reportedId: string }) => u.reportedId) || [];
    const likedUserIds = user?.likesGiven?.map((like: { receiverId: string }) => like.receiverId) || [];
    const gender = user?.profile?.gender === 'male' ? 'female' : 'male'

    const [allUsers, total] = await prisma.$transaction([
      prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          id: {
            notIn: [session.user.id, ...likedUserIds, ...reportedUserIds],
          },
          photos: {
            some: {}
          },
          // profile:{
          //   gender
          // }
        },
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          name: true,
          verified: true,
          createdAt: true,
          photos: {
            take: 6,
            select: {
              url: true,
            }
          },
          profile: {
            select: {
              job: true,
              batch: true,
              location: true,
              livingIn: true,
              lookingFor: true,
              height: true,
              bio: true,
              age: true,
              languages: true,

              keywords: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      }),
      prisma.user.count({
        where: {
          id: {
            notIn: [session.user.id, ...likedUserIds, ...reportedUserIds],
          },
          photos: {
            some: {}
          },
          //  profile:{
          //   gender
          // }
        },
      })
    ])

    return JSON.parse(JSON.stringify({ user, shuffled: allUsers, total }))
  } catch (error) {

  }
}

