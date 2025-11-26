import React, { useEffect, useState } from "react";
import ImageHandler from "../components/ImageHandler";
import { Link } from "react-router-dom";
import add from "../assets/add.svg";
import remove from "../assets/remove.svg";

const CartProduct = ({ product, handleRemove, handleQuantityChange }) => {
  const [noOfItems, setNoOfItems] = useState(product.quantity || 1);

  useEffect(() => {
    handleQuantityChange(product._id, noOfItems);
  }, [noOfItems]);

  const handleOnChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value < 16) {
      setNoOfItems(value);
    }
  };

  const handleInc = () => {
    if (noOfItems < 16) {
      setNoOfItems((pre) => pre + 1);
    }
  };

  const handleDec = () => {
    if (noOfItems > 1) {
      setNoOfItems((pre) => pre - 1);
    }
  };

  const currentPrice =
    noOfItems > 0 ? product.price * noOfItems : product.price;
  return (
    <div className="border mb-3">
      <div className="grid grid-cols-2 mt-3 p-3 gap-3" key={product._id}>
        <div>
          <ImageHandler src={product.images[0]} alt={product.title} />
        </div>
        <div>
          <Link
            to={`/product/${product._id}`}
            className="text-[18px] font-semibold group-hover:text-blue-600 transition duration-300"
          >
            {product.title}
          </Link>
          <p>price : ${currentPrice}</p>
          <p className="line-clamp-3 text-justify">{product.description}</p>
        </div>
      </div>
      <div className="flex justify-around mt-4">
        <div className="flex gap-3 mb-3">
          <img
            className="border p-3 rounded-full"
            src={remove}
            onClick={handleDec}
            alt=""
          />
          <input
            type="number"
            className="w-10 [&::-webkit-inner-spin-button]:appearance-none
                   [&::-webkit-outer-spin-button]:m-0 [appearance:textfield] border p-3"
            value={noOfItems}
            onChange={handleOnChange}
            max={16}
          />
          <img
            className="border p-3 rounded-full"
            src={add}
            onClick={handleInc}
            alt=""
          />
        </div>
        <div>
          <button
            className="px-3 py-2 text-sm border-2 border-amber-400 bg-amber-400 hover:bg-amber-500 rounded-lg text-white font-semibold transition duration-200"
            onClick={() => handleRemove(product._id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
