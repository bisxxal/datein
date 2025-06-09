"use client" 

import {ImageKitAbortError,ImageKitInvalidRequestError,ImageKitServerError,ImageKitUploadNetworkError,upload,} from "@imagekit/next";
import { useRef, useState } from "react";

const UploadExample = () => {
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const abortController = new AbortController();
    const authenticator = async () => {
        try {
            // Perform the request to the upload authentication endpoint.
            const response = await fetch("/api/upload-auth");
            if (!response.ok) {
                // If the server response is not successful, extract the error text for debugging.
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }
            const data = await response.json();
            const { signature, expire, token, publicKey } = data;
            return { signature, expire, token, publicKey };
        } catch (error) {
            console.error("Authentication error:", error);
        }
    };

  
const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        alert("Please select a file to upload");
        return;
    }
    const file = fileInput.files[0];
    let authParams;
    try {
        authParams = await authenticator();
    } catch (authError) {
        console.error("Failed to authenticate for upload:", authError);
        return;
    }
    const { signature, expire, token, publicKey } = authParams;

    // Call the ImageKit SDK upload function with the required parameters and callbacks.
    try {
        const uploadResponse = await upload({
            // Authentication parameters
            expire,
            token,
            signature,
            publicKey,
            file,
            fileName: file.name,  
            onProgress: (event) => {
                setProgress((event.loaded / event.total) * 100);
            },
            abortSignal: abortController.signal,
        });
        console.log("Upload response:", uploadResponse);
    } catch (error) {
        // Handle specific error types provided by the ImageKit SDK.
        if (error instanceof ImageKitAbortError) {
            console.error("Upload aborted:", error.reason);
        } else if (error instanceof ImageKitInvalidRequestError) {
            console.error("Invalid request:", error.message);
        } else if (error instanceof ImageKitUploadNetworkError) {
            console.error("Network error:", error.message);
        } else if (error instanceof ImageKitServerError) {
            console.error("Server error:", error.message);
        } else {
            // Handle any other errors that may occur.
            console.error("Upload error:", error);
        }
    }
};

    return (
        <>
            {/* File input element using React ref */}
            <input type="file" ref={fileInputRef} />
            {/* Button to trigger the upload process */}
            <button type="button" onClick={handleUpload}>
                Upload file
            </button>
            <br />
            {/* Display the current upload progress */}
            Upload progress: <progress value={progress} max={100}></progress>
        </>
    );
};

export default UploadExample;

// "use client";

// import {
//   ImageKitAbortError,
//   ImageKitInvalidRequestError,
//   ImageKitServerError,
//   ImageKitUploadNetworkError,
//   upload,
// } from "@imagekit/next";
// import { useRef, useState } from "react";

// const UploadExample = () => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [previews, setPreviews] = useState<string[]>([]);
//   const [progressMap, setProgressMap] = useState<{ [key: string]: number }>({});
//   const [isUploading, setIsUploading] = useState(false);

//   const abortController = new AbortController();

//   const authenticator = async () => {
//     const response = await fetch("/api/upload-auth");
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Request failed with status ${response.status}: ${errorText}`);
//     }
//     return await response.json();
//   };

//   const handlePreview = () => {
//     const files = fileInputRef.current?.files;
//     if (files && files.length > 0) {
//       const urls = Array.from(files).map((file) => URL.createObjectURL(file));
//       setPreviews(urls);
//     }
//   };

//   const handleUpload = async () => {
//     const fileInput = fileInputRef.current;
//     if (!fileInput || !fileInput.files || fileInput.files.length > 5) {
//       alert("Please select at least 5 files to upload");
//       return;
//     }

//     const files = Array.from(fileInput.files);
//     setIsUploading(true);

//     let authParams;
//     try {
//       authParams = await authenticator();
//     } catch (authError) {
//       console.error("Failed to authenticate for upload:", authError);
//       setIsUploading(false);
//       return;
//     }

//     const uploadedUrls: string[] = [];

//     for (const file of files) {
//       try {
//         const uploadResponse = await upload({
//           ...authParams,
//           file,
//           fileName: file.name,
//           onProgress: (event) => {
//             setProgressMap((prev) => ({
//               ...prev,
//               [file.name]: (event.loaded / event.total) * 100,
//             }));
//           },
//           abortSignal: abortController.signal,
//         });

//         uploadedUrls.push(uploadResponse.url);
//       } catch (error) {
//         console.error("Upload error for file:", file.name, error);
//       }
//     }

//     try {
//       const res = await fetch("/api/save-photos", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           urls: uploadedUrls,
//           userId: "USER_ID_HERE",
//         }),
//       });

//       if (!res.ok) {
//         throw new Error("Error saving to DB");
//       }

//       alert("Upload and save successful!");
//     } catch (dbError) {
//       console.error("Error saving to DB:", dbError);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 space-y-4">
//       <h1 className="text-xl font-bold mb-4">Upload Multiple Images</h1>

//       <input
//         type="file"
//         ref={fileInputRef}
//         multiple
//         accept="image/*"
//         onChange={handlePreview}
//         className="block mb-2"
//       />

//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         {previews.map((src, index) => (
//           <div key={index} className="relative">
//             <img
//               src={src}
//               alt={`Preview ${index}`}
//               className="w-full h-32 object-cover rounded shadow"
//             />
//             {isUploading && (
//               <progress
//                 value={progressMap[fileInputRef.current?.files?.[index]?.name] || 0}
//                 max={100}
//                 className="w-full mt-1"
//               ></progress>
//             )}
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={handleUpload}
//         disabled={isUploading}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//       >
//         {isUploading ? "Uploading..." : "Upload Files"}
//       </button>
//     </div>
//   );
// };

// export default UploadExample;
