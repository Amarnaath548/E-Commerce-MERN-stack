import React, { useState } from "react";
import errImg from "../assets/images (2).jpg";
import SelectImg from "./SelectImg";

const ProductImage = ({ img }) => {
  const [imgSrc, setImgSrc] = useState(img[0]);
   const [imageError, setImageError] = useState(false);
    
      const handleError = () => {
        setImageError(true);
      };

      const handleThumbnailClick = (image) => {
    setImgSrc(image);
    // **Crucial Fix:** Reset the main image error state when a new image is selected.
    setImageError(false);
  };
  
      console.log(imgSrc);
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        {img.map((image, index) => (
          // <img 
          //   key={index}
          //   className={`w-20 h-20 object-cover rounded-lg cursor-pointer border hover:scale-102 transition duration-300
          //     ${imgSrc === image ? "border-amber-500" : "border-gray-300"}
          //     hover:border-amber-600 transition`}
          //   onClick={() => setImgSrc(image)}
          //  src={imageError ? errImg : image}
          //   alt=""
          //   onError={imageError ? null : handleError}
          // />
          <SelectImg key={index} image={image} imgSrc={imgSrc} handleThumbnailClick={handleThumbnailClick} errImg={errImg} />
        ))}
      </div>

      <div className="w-full">
        <img
          src={imageError ? errImg : imgSrc}
          alt=""
          onError={imageError ? null : handleError}
          className="w-full rounded-xl shadow-lg object-cover transition duration-300 hover:scale-102"
        />
      </div>
    </div>
  );
};

export default ProductImage;
