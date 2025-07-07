
'use client'
import { addInterests } from '@/actions/user.action'
import Back from '@/components/ui/back'
import BackgroundPatten from '@/components/ui/backgroundPatten'
import { interestsData } from '@/util'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Intrestspage = () => {
  const [selected, setSelected] = useState<string[]>([])
  const [allInterests, setAllInterests] = useState<string[]>([])
  const queryClient = useQueryClient();
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const initialInterests = searchParams.get('interest')?.split(',') || []
    if (initialInterests.includes('')) {
      initialInterests.length = 0
    }
    const merged = Array.from(new Set([...initialInterests, ...interestsData]))
    setAllInterests(merged)

    // Pre-select any interests passed in URL
    setSelected(initialInterests)
  }, [])

  const toggleInterest = (interest: string) => {
    if (selected.includes(interest)) {
      setSelected(selected.filter(i => i !== interest))
    } else {
      if (selected.length < 5) {
        setSelected([...selected, interest])
      } else {
        toast.error('You can select up to 5 interests only.')
      }
    }
  }

  const handleSubmit = async () => {
    updatedMutation.mutate(selected);
  }
  const updatedMutation = useMutation({
    mutationFn: async (selected: string[]) => {
      return await addInterests(selected);
    },
    onSuccess: (data) => {
      toast.success('Interests submitted successfully!')
      queryClient.invalidateQueries({ queryKey: ['fetchUsersProfile'] });
    },

    onError: (error) => {
      toast.error('Failed to submit interests.')
    },
  });
  return (
    <BackgroundPatten>
      <div className='w-full px-10 max-md:px-2 py-10'>
        <Back url={'/profile/editprofile'} className='' />
        <h1 className='my-5 text-3xl text-gray-100 font-bold'>Interests</h1>

        <div className='w-full  flex h-[70px] overflow-x-auto gap-5 '>
          {selected.map((i, index) => (
            <h3
              key={index}
              className='flex items-center cursor-pointer gap-2 buttonbg text-white h-fit  p-1 rounded-full px-4 whitespace-nowrap'
            >
              <button onClick={() => toggleInterest(i)} className='text-red-600 text-2xl'>
                 ⅹ
              </button>
              {i}
            </h3>
          ))}
        </div>

        {/* All merged interests */}
        <div className='w-full flex flex-wrap justify-evenly gap-3 mt-5'>
          {allInterests.map((i, index) => (
            <h3
              key={index}
              onClick={() => toggleInterest(i)}
              className={`whitespace-nowrap cursor-pointer border-2 h-fit p-1.5 rounded-full px-5 max-md:px-4 ${selected.includes(i) ? ' base border-indigo-600 text-white' : 'border-zinc-700/20 text-zinc-700/80 hover:bg-zinc-100'}`}>
              {i}
            </h3>
          ))}
        </div>
 
        <div className='mt-8 flex justify-center'>
          <button
            onClick={handleSubmit}
            disabled={updatedMutation.isPending || selected.length === 0}
            hidden={selected.length === 0   }
            className='buttonbg2 text-white px-6 py-2 rounded-full disabled:opacity-[0.6] disabled:cursor-not-allowed  '
          >
            {updatedMutation.isPending ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </BackgroundPatten>
  )
}

export default Intrestspage
