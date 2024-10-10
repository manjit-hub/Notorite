import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// export const uploadToCloudinary = async (fileBuffer, originalname) => {
//     console.log("File received for upload:", originalname); // Log the received original file name

//     return new Promise((resolve, reject) => {
//         const stream = cloudinary.v2.uploader.upload_stream(
//             {
//                 folder: "../files/",
//                 resource_type: "auto",
//                 type: "authenticated",
//                 public_id: originalname.split('.')[0],
//             },
//             (error, result) => {
//                 if (error) {
//                     console.error("Cloudinary upload error:", error);
//                     reject(new Error("File Upload Failed"));
//                 } else {
//                     console.log("File uploaded to Cloudinary:", result.secure_url);
//                     resolve(result);
//                 }
//             }
//         );

//         stream.end(fileBuffer);
//     });
// };

export const uploadToCloudinary = async (localFilePath, originalname) => {
    try {
        if (!localFilePath) return "";

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            public_id: originalname.split('.')[0],
        });

        // File uploaded successfully
        console.log("File uploaded to Cloudinary:", response.url);
        fs.unlinkSync(localFilePath);
        return response;

    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        fs.unlinkSync(localFilePath); // Remove the locally saved temporary file as the upload operation failed
        return null;
    }
};
