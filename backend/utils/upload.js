import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadMultipleImages = async (req) => {
  try {
    
  
    const files = req.files; 

    if (!files || files.length === 0) {
      throw new Error("no files to upload");
    }

    // upload each image to Cloudinary
    const uploadPromises = files.map((file) =>
      cloudinary.uploader.upload(file.path, {
        folder: "ecommerce",
      })
    );

    const results = await Promise.all(uploadPromises);

    // delete temp files
    files.forEach((file) => fs.unlinkSync(file.path));

    // return only secure URLs
    const urls = results.map((result) => result.secure_url);

    return urls;
    } catch (error) {
    throw new Error(error.message);
    
  }

};

export const uploadImage = async (req) => {
  try {
    const file = req.file;
    
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "profile_avatars",
    });

    fs.unlinkSync(file.path);

   return result.secure_url ;
  } catch (error) {
    console.error(error);
    throw new Error("Image upload failed");
  }
};


// export const deleteImage = async (publicId) => {
//   try {
//     const result = await cloudinary.uploader.destroy(publicId);
//     return result;
//   } catch (error) {
//     throw new Error("Image deletion failed");
//   }
// };