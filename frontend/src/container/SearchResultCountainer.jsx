import { useLocation } from "react-router";
import usePaginationFetch from "../CustomHook/usePaginationFetch";
import ProductPresenter from "../presenter/ProductPresenter";
import ErrorComponent from "../components/ErrorComponent";

const SearchResultCountainer = () => {
  const location = useLocation();
  console.log(location.search);
  const baseUrl=import.meta.env.VITE_BACKEND_URL
  const componentKey = location.search;
  const url = `${baseUrl}/products/${location.search}&`;

  const SearchLogic = () => {
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
      />
    );
  };

  // Render the logic component with the key
  return <SearchLogic key={componentKey} />;
};

export default SearchResultCountainer;
