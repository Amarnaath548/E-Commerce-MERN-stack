import React, { Suspense } from "react";
import Loading from "../components/Loading";
import ProductImage from "../components/ProductImage";
import { Link } from "react-router";
import ProductRelated from "../components/ProductRelated";

const SingleProductPresenter = ({ product, loading, id, addToCart }) => {
  return (
    <div className="p-6 mx-auto">
      <Suspense fallback={<Loading data={"Cart"} />}>
        {!loading && product && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <ProductImage img={product.images} />

              <button
                onClick={addToCart}
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-500 
                   active:scale-95 font-semibold transition transform"
              >
                ADD TO CART
              </button>

              <button
                className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white 
                    active:scale-95 font-semibold transition transform"
              >
                BUY NOW
              </button>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold">{product.title}</h2>
              <p className="text-2xl font-semibold text-green-600">
                ${product.price}
              </p>

              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold">Description:</span>{" "}
                {product.description}
              </p>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-lg mb-2">Category</h3>
                <div
                  className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 
                            rounded-xl overflow-hidden shadow-md 
                            group cursor-pointer select-none"
                >
                  {/* Image */}
                  <Link to={`/category/${product.category._id}`}>
                    <img
                      src={product.category.image}
                      alt=""
                      className="w-full h-full object-cover transition duration-300 
                      group-hover:scale-110 group-hover:brightness-50
                      active:scale-110 active:brightness-50"
                    />

                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 
                              group-hover:opacity-100 active:opacity-100 transition duration-300"
                    >
                      <p
                        className="text-white font-semibold text-sm sm:text-base bg-black/40 
                              px-3 py-1 rounded-lg"
                      >
                        {product.category.name}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        <ProductRelated id={id} />
      </Suspense>
    </div>
  );
};

export default SingleProductPresenter;
