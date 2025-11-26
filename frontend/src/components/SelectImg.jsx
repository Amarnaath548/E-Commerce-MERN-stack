import React, { useState } from 'react'

const SelectImg = ({image,imgSrc,handleThumbnailClick,errImg}) => {
    const [imageError, setImageError] = useState(false);
  
    const handleError = () => {
      setImageError(true);
    };
    console.log("imgsrc",imgSrc,"image",image)
  return (
    <img 
                
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border hover:scale-102 transition duration-300
                  ${imgSrc === image ? "border-amber-500" : "border-gray-300"}
                  hover:border-amber-600 transition`}
                onClick={() => handleThumbnailClick(image)}
               src={imageError ? errImg : image}
                alt=""
                onError={imageError ? null : handleError}
              />
  )
}

export default SelectImg