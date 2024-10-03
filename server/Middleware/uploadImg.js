import cloudinary from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (file) => {
    console.log("File received for upload:", file); 

    if (!file || !file.buffer) {
        console.error("No file or buffer found:", file); 
        throw new Error("No file provided for upload");
    }

    return new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
            {
                folder: "uploads/", 
                resource_type: "image", 
                public_id: file.originalname.split('.')[0], 
                format: file.mimetype.split("/")[1], 
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);
                    reject(new Error("Image Upload Failed"));
                } else {
                    console.log("Image uploaded to Cloudinary:", result.secure_url);
                    resolve(result); 
                }
            }
        );

        stream.end(file.buffer); 
    });
};
