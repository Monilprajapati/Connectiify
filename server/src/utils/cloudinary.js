import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '../config/serverConfig.js';

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })
        // file has been uploaded successfully
        // console.log("File is uploaded successfully! ", response.url);
        fs.unlinkSync(localFilePath); // remove the locally saved file as uploading to cloudinary succeeded
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // remove the locally saved file as uploading to cloudinary failed
    }
}

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

export { uploadOnCloudinary }