'use client'  
import Back from "@/components/ui/back";
import EditFormCom from "../../../_components/editFormCom";
import PhotoUploadCom from "../../../_components/photoUploadCom";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/actions/user.action";
import { UserProfileProps } from "@/constant";
import BackgroundPatten from "@/components/ui/backgroundPatten";

export default  function PhotoUploader() {
       const client = new QueryClient();
       const { isLoading, data } = useQuery({
           queryKey: ['fetchUsersProfile', client],
           queryFn: async () => {
           const data  = await getUserProfile();
           return data;
       },
       staleTime: 60000,
     });
  //  const data  = await getUserProfile();
  return (
    <BackgroundPatten>

    <div className=' w-full min-h-screen mx-auto px-10 max-md:px-2 '>

      <Back/>
          <h1 className="text-3xl my-5 ml-7 max-md:text-center font-bold ">Edit Profile</h1>
      <PhotoUploadCom data={data?.profile?.photos} isLoading={isLoading}/>

      <EditFormCom data={data?.profile} name={data?.name} />
        
    </div>
    </BackgroundPatten>
  );
}
