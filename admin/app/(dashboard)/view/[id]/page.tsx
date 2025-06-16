import { getUser } from '@/action/admin.action';
import Back from '@/components/ui/back';
import React from 'react'

const UserIdPage = async({ params }: { params: { id: string } }) => {

    const userId = params?.id;
    const user = await getUser(userId)
  return (
    <div>
        <div className='w-full min-h-screen mt-10'>
            <Back  className='m-4' />
            <div className='flex flex-col items-center justify-center h-full'>
            <h1 className='text-2xl font-bold mb-4'>User Details</h1>
            <div className='w-full max-w-2xl bg-white shadow-md rounded-lg p-6'>
                {user ? (
                <>
                    <p><strong>ID:</strong> {userId}</p>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>

                    <div>
                        <strong>Photos:</strong>
                        <div className='flex flex-wrap gap-4 mt-2'>
                            {user.photos.map((photo: { url: string }, index: number) => (
                                <img key={index} src={photo.url} alt={`Photo ${index + 1}`} className='w-32 h-32 object-cover rounded-lg' />
                            ))}
                        </div>
                    </div>
                    {/* Add more user details as needed */}
                </>
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