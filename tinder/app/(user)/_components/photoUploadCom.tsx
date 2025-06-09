 
'use client';

import { savePhotoUrlsToDB } from '@/actions/user.action';
import LoadingCom from '@/components/ui/loading';
import { useMutation , useQueryClient } from '@tanstack/react-query';

import { useState, useRef } from 'react';
import { Image } from "@imagekit/next";
const PhotoUploadCom = ({data , isLoading}:{data:{url:string}[] , isLoading:boolean}) => {
  
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newFiles = [...files, ...selectedFiles].slice(0, 6 - (data?.length || 0)); // limit total to 6
    setFiles(newFiles);
    setPreviews(newFiles.map(file => URL.createObjectURL(file)));
  };
 
const queryClient = useQueryClient();  

const uploadMutation = useMutation({
  mutationFn: async (formData: FormData) => {
    return await savePhotoUrlsToDB(formData);
  },
  onSuccess: () => {
    setFiles([]);
    setPreviews([]);
    queryClient.invalidateQueries({ queryKey: ['uploadPhoto'] }); // Refetch existing photos
  },
  onError: (error) => {
    console.error('Upload failed', error);
  },
});

const handleUpload = () => {
  const formData = new FormData();
  files.forEach(file => formData.append('photos', file));
  uploadMutation.mutate(formData); // Call mutation
};


  const existingImages = data || [];
  const totalImagesCount = existingImages?.length + previews?.length;
  const len = 6 - totalImagesCount;

  // console.log('Existing Images:', existingImages);
  return (
    <div className='w-full px-5  max-md:px-0 '>
      <h1 className='my-9 ml-4'>
        <p className='font-bold'>Media</p>
        <span className='text-zinc-400'> Add up to 6 photos. </span>
      </h1>

      <div className="w-full flex  flex-wrap justify-between px-5 gap-5 max-md:px-2 mt-4">

      {!isLoading ? <>
       
        {existingImages && existingImages?.map((u: {url:string}, idx: number) =>  {
          return(
          <img key={`existing-${idx}`} src={u?.url} alt="Uploaded" height={1000} width={1000} className=" max-md:w-[47%] max-md:h-[230px]  w-[200px] h-[300px] rounded-2xl border object-contain" />
          )
        })}
        { previews && previews?.map((src, idx) => (
          <Image height={800} width={500} key={`preview-${idx}`} src={src} alt="Preview" className=" max-md:w-[47%] max-md:h-[230px]  w-[200px] h-[300px] rounded-2xl border object-contain" />
        ))}

        {[...Array(len)].map((_, i) => (
          <div key={i} className=' max-md:w-[47%] max-md:h-[230px]  w-[200px] h-[300px] flex items-center justify-center bg-[#0000004a] rounded-2xl border-dashed border'>
            <button
              className='bg-pink-500 h-10 w-10 flex text-2xl rounded-full items-center justify-center'
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
        className="my-10 px-3 py-3 rounded-full w-[300px] mx-auto block bg-pink-500 text-white"
      >
        Upload
      </button>
    </div>
  );
};

export default PhotoUploadCom;
