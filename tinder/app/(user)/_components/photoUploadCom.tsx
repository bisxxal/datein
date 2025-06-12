'use client';
import { deletePhotos, savePhotoUrlsToDB } from '@/actions/user.action';
import LoadingCom from '@/components/ui/loading';
import { useMutation , useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { RxCross1 } from "react-icons/rx";
 import { FiMinus } from "react-icons/fi";
 

const PhotoUploadCom = ({data , isLoading}:{data:{id:string; url:string}[] , isLoading:boolean}) => {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();  
  const [deleteId, setDeleteId] = useState<string[]>([]);

  const uploadMutation = useMutation({
  mutationFn: async (formData: FormData) => {
    return await savePhotoUrlsToDB(formData);
  },
  onSuccess: () => {
    setFiles([]);
    setPreviews([]);
    queryClient.invalidateQueries({ queryKey: ['fetchUsersProfile'] }); // Refetch existing photos
  },

  onError: (error) => {
    console.error('Upload failed', error);
  },
});

const isUploading = uploadMutation?.isLoading;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newFiles = [...files, ...selectedFiles].slice(0, 6 - (data?.length || 0)); // limit total to 6
    setFiles(newFiles);
    setPreviews(newFiles.map(file => URL.createObjectURL(file)));
  };
 
 // Remove a preview image (and corresponding file)
const handleRemovePreview = (index: number) => {
  setFiles(prev => prev.filter((_, i) => i !== index));
  setPreviews(prev => prev.filter((_, i) => i !== index));
};


const handleUpload = () => {
  const formData = new FormData();
  files.forEach(file => formData.append('photos', file));
  uploadMutation.mutate(formData); // Call mutation
};


  const existingImages = data || [];
  const totalImagesCount = existingImages?.length + previews?.length;
  const len = 6 - totalImagesCount;

  // console.log('Existing Images:', existingImages);
 

  const deletPhotoMutation = useMutation({
  mutationFn: async ( id:string[] ) => {
    return await deletePhotos(id);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['fetchUsersProfile'] }); // Refetch existing photos
  },

  onError: (error) => {
    console.error('Upload failed', error);
  },
});
  const handelDelete = async()=>{
    if(deleteId.length === 0){
      toast.error('Please select photos to delete');
      return;
    }
    console.log('deleteId', deleteId);
    deletPhotoMutation.mutate(deleteId);
    setDeleteId([]);
    toast.success('deleted successfuly')
    router.refresh()
  } 
  const handelChangeDelete = (id: string) => {
  setDeleteId(prev => {
    if (prev.includes(id)) {
      // Remove ID if already selected
      return prev.filter(item => item !== id);
    } else {
      // Add ID if not already selected
      return [...prev, id];
    }
  });
  console.log('Selected IDs:', deleteId);
};

  return (
    <div className='w-full px-5  max-md:px-0 '>
      <h1 className='my-9 ml-4'>
        <p className='font-bold'>Media</p>
        <span className='text-zinc-300 mt-3'> Add atleast 2 photo. </span>
      </h1>

      <div className="w-full flex  flex-wrap justify-between px-5 gap-5 max-md:px-2 mt-4">

      {!isLoading ? <>
       
        {existingImages && existingImages?.map((u:{id:string , url:string} , idx: number) =>  {
          return(
            
            <div onClick={()=>handelChangeDelete(u?.id)} className='relative max-md:w-[47%] max-md:h-[230px]  w-[200px] h-[300px] rounded-2xl border border-black/20'>
              {deleteId.includes(u?.id) ? <div className=' absolute -top-2 -right-2 buttongreen rounded-full text-lg !p-1 !py-1  '> <FiMinus /> </div>
            :  
              <div className=' absolute -top-2 -right-2 buttonred rounded-full !p-1 !py-1  '><RxCross1 /></div>
            }
              <img loading='lazy' key={`existing-${idx}`} src={u?.url} alt="Uploaded" height={1000} width={1000} className="  w-full h-full rounded-2xl  object-cover" />
            </div>
          )
        })}
        { previews && previews?.map((src, idx) => (
          <div className=' relative  max-md:w-[47%] max-md:h-[230px]  w-[200px] h-[300px] rounded-2xl border border-black/20'>
             <div onClick={() => handleRemovePreview(idx)} className=' absolute -top-2 -right-2 border-2 border-red-500/50 text-red-500 backdrop-blur-[10px] rounded-full !p-1 !py-1  '><RxCross1 /></div>
            <Image height={1800} width={1500} key={`preview-${idx}`} src={src} alt="Preview" className=" h-full w-full rounded-2xl  object-cover" />
          </div>
        ))}

        {[...Array(len)].map((_, i) => (
          <div key={i} className=' max-md:w-[47%] glass3 max-md:h-[230px]  w-[200px] h-[300px] flex items-center justify-center bg-[#ffffff21] rounded-2xl border-dashed border border-black/20'>
            <button
              className='buttonbg h-10 w-10 flex text-2xl rounded-full items-center justify-center'
              onClick={() => fileInputRef.current?.click()}
            >
              +
            </button>
          </div>
        ))}
  </> :

    <LoadingCom boxes={6} width=" max-md:w-[47%] max-md:h-[230px] !rounded-2xl w-[200px] h-[300px] " margin=" !items-start !justify-between  py-0 flex-wrap px-5 max-md:px-0 gap-5 flex-row " />
  
  }
      </div>

      <input
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <button
        hidden={previews.length === 0}
        onClick={handleUpload}
        disabled={isUploading || files.length === 0}
        className="my-10 px-3 py-3 rounded-full w-[300px] disable:bg-gray-200  mx-auto block buttonbg text-white"
      >
        {isUploading ? 'Uploading...' : 'Upload'}

      </button>
      
      <button
        onClick={()=>handelDelete()}
        hidden={deleteId.length === 0}
        disabled={ deletPhotoMutation.status === 'pending' || deleteId.length === 0}
        className="my-10 px-3 py-3 rounded-full w-[300px]   mx-auto block buttonred text-white"
      > Delete Selected Photos
      </button>
    </div>
  );
};

export default PhotoUploadCom;
 