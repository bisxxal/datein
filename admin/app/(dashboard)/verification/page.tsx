import VerificationForm from '@/components/verification';
import prisma from '@/lib/prisma';
import moment from 'moment';

const Verification = async () => {

    const data = await prisma.verified.findMany({
        orderBy:{
            createdAt: 'desc'
        },
    })

    return (
        <div className=' w-full min-h-screen mt-10 '>
            <div className='flex flex-col items-center justify-center h-full'>
                <h1 className='text-2xl textbase font-bold mb-4'>Verification Page</h1>
                <div className='w-full px-20 max-md:px-10 rounded-lg p-6'>
                    <h2 className='text-xl text-green-600 font-semibold mb-4'>Pending Verifications : ({data.length})</h2>
                    <div className='space-y-4 w-full'>
                        {data && data?.map((item: any) => (
                            <div key={item.id} className='p-5 px-6 border border-black/20 shadow-xl w-full flex items-center justify-between rounded-3xl'>
                                <div>
                                    <p className=' text-gray-800 text-xl'><strong>Roll No:</strong> {item.rollNo}</p>
                                    <p className=' text-gray-600'><strong>UserId:</strong> {item.userId}</p>
                                    <p className=' text-gray-600'><strong>Created At:</strong>  {moment(item?.createdAt).format('LT MMM Do ')}</p>
                                </div>

                                <VerificationForm userId={item.userId} id={item.id} />
                            </div>
                        ))}
                    </div>
                    {data?.length === 0 && <p className='text-gray-500'>No pending verifications.</p>}
                </div>
            </div>
        </div>
    )
}

export default Verification