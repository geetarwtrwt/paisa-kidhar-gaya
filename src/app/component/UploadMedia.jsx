// import React from "react";
// import { CldUploadWidget } from "next-cloudinary";
// import { useAuth } from "../UseAuth";

// function UploadMedia() {
//   let { toast } = useAuth();
//   let handleOnError = (error) => {
//     toast.error(error.message);
//   };
//   let handleOnQueuesEnd = async (results) => {
//     let files = results.info.files;
//     let uploadFiles = files
//       .filter((file) => file.uploadInfo)
//       .map((file) => ({
//         asset_id: file.uploadInfo.asset_id,
//         public_id: file.uploadInfo.public_id,
//         sercure_url: file.uploadInfo.sercure_url,
//         path: file.uploadInfo.path,
//         thumbnail_url: file.uploadInfo.thumbnail_url,
//       }));
//   };
//   return (
//     <CldUploadWidget
//       signatureEndpoint="/api/cloudinary-signature"
//       uploadPreset={process.env.CLOUDINARY_PRESET}
//       onError={handleOnError}
//       onQueuesEnd={handleOnQueuesEnd}
//       config={{
//         cloud: {
//           cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//           apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
//         },
//       }}
//       options={{
//         sources: ["local", "url", "google_drive", "cloudinary"],
//         folder: "userProfile",
//       }}
//     >
//       {({ open }) => {
//         return (
//           <button
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//             onClick={() => open()}
//           >
//             Upload an Image
//           </button>
//         );
//       }}
//     </CldUploadWidget>
//   );
// }

// export default UploadMedia;
