import React, { useState } from "react";
import errImg from "../assets/images (2).jpg";

//const FallbackImage = "https://placehold.co/600x400";
//"https://placehold.co/600x400"

const ImageHandler = ({ src, alt }) => {
  const [imageError, setImageError] = useState(false);

  const handleError = () => {
    setImageError(true);
  };

  return (
    <img draggable={false}
      className="w-full h-fit md:h-70 object-contain"
      src={imageError ? errImg : src}
      
      alt={alt}
      onError={imageError ? null : handleError}
    />
  );
};

export default ImageHandler;
