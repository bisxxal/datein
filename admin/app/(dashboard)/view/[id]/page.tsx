import { getUser } from '@/action/admin.action';
import Back from '@/components/ui/back';
import React from 'react'

const UserIdPage = async ({ params }: { params: { id: string } }) => {

    const userId = params?.id;
    const user = await getUser(userId)
    return (
        <div>
            <div className='w-full min-h-screen mt-10'>
                <Back className='m-4' />
                <div className='flex flex-col items-center justify-center h-full'>
                    <h1 className='text-2xl textbase font-bold mb-2'>User Details</h1>
                    <div className=' w-[70%] mx-auto border border-black/20 shadow-md rounded-3xl p-6'>
                        {user ? (
                            <div className=' text-xl'>
                              <div className=' flex flex-col gap-2 '>
                                <p ><strong>ID:</strong> {userId}</p>
                                <p ><strong>Name:</strong> {user?.name}</p>
                                <p ><strong>Email:</strong> {user?.email}</p>
                                <p ><strong>batch:</strong> {user?.profile?.batch}</p>
                                <p ><strong>Age:</strong> {user?.profile?.age}</p>
                              </div>

                                <div>
                                    <div className='flex flex-wrap justify-between w-full gap-4 mt-2'>
                                        {user.photos.map((photo: { url: string }, index: number) => (
                                            <img key={index} src={photo.url} alt={`Photo ${index + 1}`} className='w-[300px] h-[350px] border border-black/20 object-cover rounded-3xl' />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className='text-gray-500'>No user found with this ID.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserIdPage