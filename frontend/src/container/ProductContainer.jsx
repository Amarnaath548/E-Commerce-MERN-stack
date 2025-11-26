import ProductPresenter from "../presenter/ProductPresenter";
import ErrorComponent from "../components/ErrorComponent";
import usePaginationFetch from "../CustomHook/usePaginationFetch";

const ProductContainer = () => {

  const url = `${import.meta.env.VITE_BACKEND_URL}/products?`;

  const {
    products,
    loading,
    error,
    hasMore,
    handlePrePage,
    handleNextPage,
    currentPage,
    offset,
  } = usePaginationFetch(url);
console.log(products)
  if (error || products===null) return <ErrorComponent error={error || "products is null"} />;

  return (
    <ProductPresenter
      products={products}
      handleNextPage={handleNextPage}
      handlePrePage={handlePrePage}
      hasMore={hasMore}
      offset={offset}
      loading={loading}
      currentPage={currentPage}
    />
  );
};

export default ProductContainer;
