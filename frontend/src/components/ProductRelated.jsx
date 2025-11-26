import React from "react";
import useFetch from "../CustomHook/UseFetch";
//import usePaginationFetch from '../CustomHook/usePaginationFetch';
import ProductPresenter from "../presenter/ProductPresenter";
import ErrorComponent from "./ErrorComponent";

const ProductRelated = ({ id }) => {
  const baseUrl=import.meta.env.VITE_BACKEND_URL
  const url = `${baseUrl}/products/${id}/related`;
  const { data: products, loading, error } = useFetch(url);

  if (error) return <ErrorComponent error={error} />;
  return (
    <div className="border-t mt-3 mx-auto">
      <h2 className="text-xl font-medium m-3">RELATED PRODUCTS</h2>
      <ProductPresenter products={products} loading={loading} />
    </div>
  );
};

export default ProductRelated;
