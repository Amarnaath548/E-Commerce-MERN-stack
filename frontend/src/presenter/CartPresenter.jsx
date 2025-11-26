import React, { Suspense } from "react";
import Loading from "../components/Loading";
import CartProduct from "../components/CartProduct";

const CartPresenter = ({
  products,
  handleRemove,
  handleQuantityChange,
  total,
}) => {
  return (
    <Suspense fallback={<Loading data={"Cart"} />}>
      <div className="mt-4">
        {products &&
          products.map((product) => (
            <CartProduct
              key={product._id} // Added key for list items
              product={product}
              handleRemove={handleRemove}
              handleQuantityChange={handleQuantityChange}
            />
          ))}
      </div>
      <div className="border-t mt-5 p-3 flex justify-end mb-4">
        <h3 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h3>
      </div>
    </Suspense>
  );
};

export default CartPresenter;
