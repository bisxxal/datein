'use client'
import Link from 'next/link'
import { updateProfile } from '@/actions/user.action'
import { createProfileForm, TCreateProfileForm } from "@/lib/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast';
 
 interface UserProfileProps{
    age?:number ,
    batch?:number ,
    gender?:string ,
    bio?:string ,
    height?:number ,
    job?:string ,
    keywords?:{
        name:string
    }[] ,
    languages?:string,
    livingIn?:string,
    lookingFor?:string,
    photos?:{
        url:string
    }[],
}

const EditFormCom = ({data ,name}:{data:UserProfileProps,name:string}) => {
    const interest = data?.keywords?.map((i:{name:string})=>i.name).join(',')
    const { register, handleSubmit , 
                formState:{errors , isSubmitting  ,isLoading , isDirty}, } = useForm<TCreateProfileForm>({resolver:zodResolver(createProfileForm)})
        
        const onSubmit = async (data:TCreateProfileForm) => {
            console.log( 'in submit' , data )
            try {
               const res = await updateProfile(data)
                if(res?.status === 200){
                    toast.success(res?.message)
                }
                else{
                    toast.error('Failed to update Profile ')
                }
                } catch (error) {
                  toast.error('Failed to update Profile ')
            }   

            }
            
  return (
    <div className=' px-5 my-6 w-full flex flex-col gap-6'>

       <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col gap-6'>

        <div>
        <p className=' text-xl font-semibold '>About me</p>
        <input className='p-3 w-full my-5 rounded-xl bg-[#00000014] backdrop-blur-[10px] ' defaultValue={data?.bio} {...register("bio")}  placeholder='Write something about yourself...'/>
            {data?.bio ? data?.bio : ''}
         {errors?.bio && <span className=' text-red-500'>{errors?.bio?.message}</span>}
        </div>  

        <div>
        <p className=' text-xl font-semibold  ' >Name</p>
         <div className='p-3 w-full h-12 px-6 center !justify-between rounded-xl bg-[#00000014] backdrop-blur-[10px] '>
             <input className='w-full h-full  outline-none placeholder:text-gray-400 textbase' {...register("name")} defaultValue={name} type="text" placeholder='jhone deo' />
            </div>
              {errors?.name && <span className=' text-red-500'>{errors?.name?.message}</span>}
        </div>

        <div>
        <p className=' text-xl font-semibold '>Age</p>
         <div className='p-3 w-full h-12 px-6 center !justify-between rounded-xl bg-[#00000014] backdrop-blur-[10px] '>
             <input className='w-full h-full outline-none placeholder:text-gray-400 textbase'  {...register("age")} defaultValue={data?.age} type="number" placeholder='20' />
            </div>
              {errors?.age && <span className=' text-red-500'>{errors?.age?.message}</span>}
        </div>
        <div>
        <p className=' text-xl font-semibold '>Intrests</p>
            <Link className=' bg-[#00000014] backdrop-blur-[10px]  flex justify-between items-center p-2 px-5 h-12 mt-4 rounded-xl' href={`/profile/editprofile/interest?interest=${interest}`}>
           <div> {data?.keywords?.length !== 0 ? data?.keywords?.map((i:{name:string} , index:number)=>( <span key={index} className='textbase mx-1'>{i?.name} ,</span> ))  : 'Add your intrests' }</div>
           {/* <span> {data?.keywords?.map((i:{name:string} , index:number)=>( <span key={index} className=' mx-1.5'>{i?.name} ,</span> ))} </span><span className='tex-xl block'> &gt; </span> */}
          <span className='tex-xl block'> &gt; </span>
           </Link>
        </div>

        <div>
        <p className=' max-md:text-base text-xl mb-5 font-bold'>Relationship Goals</p>
            <div className='p-3 px-6 center !justify-between rounded-xl bg-[#00000014] backdrop-blur-[10px] '>
                <h1>Looking for</h1>

                <select className=' textbase' defaultValue={data?.lookingFor} {...register("relationshipGoals")} >
                    <option value="short-term">Short-term Partner</option>
                    <option value="long-term">Long-term Partner</option>
                </select>

                {errors?.relationshipGoals && <span className=' text-red-500'>{errors?.relationshipGoals?.message}</span>}
            </div>
        </div>

        <div>

            <div className='p-3 w-full h-12 px-3 center !justify-between rounded-xl bg-[#00000014] backdrop-blur-[10px] '>
                <p className=' max-md:text-base text-xl '>Batch</p>
                <select className=' textbase' defaultValue={data?.batch} {...register("batch")} >
                    <option value="bca">Bca</option>
                    <option value="Mca">Mca</option>
                    <option value="btech">btech</option>
                    <option value="law">law</option>
                    <option value="bba">Bba</option>

                     
                </select>
            </div>
                    {errors?.batch && <span className=' text-red-500'>{errors?.batch?.message}</span>}
        </div>

        <div className='bg-[#00000014] backdrop-blur-[10px]  rounded-xl'>
            <div className='p-3 w-full h-12 px-3 center !justify-between items-end   '>
        <p className=' max-md:text-base text-xl '>Gender </p>
                 
                  <select className=' textbase' defaultValue={data?.gender} {...register("gender")} >
                    <option value="male">male</option>
                    <option value="female">female</option>
                     
                </select>
            </div>
                    {errors?.gender && <span className=' text-red-500'>{errors?.gender?.message}</span>}
        </div>

        <div>
        <p className=' max-md:text-base text-xl mb-5 font-bold'>Height</p>

            <div className='p-3 w-full h-12 px-6 center !justify-between rounded-xl bg-[#00000014] backdrop-blur-[10px] '>
                 <input className='w-full h-full outline-none placeholder:text-gray-400 textbase' defaultValue={data?.height} {...register("height")} type="number" placeholder='3.3 ft' />
            </div>
                     {errors?.height && <span className=' text-red-500'>{errors?.height?.message}</span>}
        </div>

        <div>
        <p className=' max-md:text-base text-xl mb-5 font-bold'>language i know</p>

            <div className='p-3 w-full h-12 px-6 center !justify-between rounded-xl bg-[#00000014] backdrop-blur-[10px] '>
                 <input className='w-full h-full outline-none placeholder:text-gray-400 textbase' defaultValue={data?.languages} {...register("languages")} type="text" placeholder='hindi , english' />
            </div>
                     {errors?.languages && <span className=' text-red-500'>{errors?.languages?.message}</span>}
        </div>

        <div>
        <p className=' max-md:text-base text-xl mb-5 font-bold'>Job title <span className='bg-blue-500  font-normal max-md:text-sm text-white rounded-full px-2'>IMPORTANT</span> </p>

            <div className='p-3 w-full h-12 px-6 center !justify-between rounded-xl bg-[#00000014] backdrop-blur-[10px] '>
                 <input className='w-full h-full outline-none placeholder:text-gray-400 textbase' defaultValue={data?.job} {...register("job")} type="text" placeholder='google ' />
            </div>
                     {errors?.job && <span className=' text-red-500'>{errors?.job?.message}</span>}
        </div>

        <div>
        <p className=' max-md:text-base text-xl mb-5 font-bold'>Living in </p>
            <div className='p-3 w-full h-12 px-6 center !justify-between rounded-xl bg-[#00000014] backdrop-blur-[10px] '>
                 <input className='w-full h-full outline-none placeholder:text-gray-400 textbase ' defaultValue={data?.livingIn} {...register("livingIn")}  type="text" placeholder='Bhubaneswar' />
            </div>
                     {errors?.livingIn && <span className=' text-red-500'>{errors?.livingIn?.message}</span>}
        </div>

          <button className={` ${!isDirty ||isSubmitting  ? ' opacity-[0.5] ' : ' '} disabled:cursor-notallowed py-2 w-[300px w-full mx-auto !rounded-3xl  buttonbg`}   type="submit">
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
  </form>
    </div>
  )
}

export default EditFormCom