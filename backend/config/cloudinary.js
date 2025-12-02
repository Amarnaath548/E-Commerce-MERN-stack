import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || 'dnespxsij',
  api_key: process.env.CLOUDINARY_API_KEY || "917834181638642",
  api_secret: process.env.CLOUDINARY_API_SECRET || 'ngegYt3dUx7iLuxz08aSlaf9sWk',
});

export default cloudinary;
