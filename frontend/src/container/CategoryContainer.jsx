import { useParams } from "react-router-dom";
import ProductPresenter from "../presenter/ProductPresenter";
import usePaginationFetch from "../CustomHook/usePaginationFetch";
import ErrorComponent from "../components/ErrorComponent";

function CategoryContainer() {
  const { id } = useParams();

  const url = `${import.meta.env.VITE_BACKEND_URL}/categories/${id}/products?`;

  
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

  const title = products?.[0]?.category?.name || "";

  if (error) return <ErrorComponent error={error} />;

  return (
    <ProductPresenter
      products={products}
      handleNextPage={handleNextPage}
      handlePrePage={handlePrePage}
      hasMore={hasMore}
      offset={offset}
      loading={loading}
      currentPage={currentPage}
      title={title}
    />
  );
}

export default CategoryContainer;
