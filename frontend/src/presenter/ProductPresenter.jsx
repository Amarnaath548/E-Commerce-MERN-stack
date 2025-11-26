import { Link } from "react-router";
import ImageHandler from "../components/ImageHandler";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";

const ProductPresenter = ({
  products,
  handleNextPage,
  handlePrePage,
  hasMore,
  offset,
  loading,
  currentPage,
  title,
}) => {
  return (
    <div className="mt-4 p-3">
      {loading && <Loading data={"products"} />}
      {title && <h2 className="text-2xl font-medium">{title}</h2>}
      <div className="grid md:grid-cols-4 gap-3 p-3">
        {products &&
          products.length !== 0 &&
          products.map((product) => (
            <div
              className="p-3 group hover:shadow hover:shadow-neutral-700 rounded transition duration-300"
              key={product._id}
            >
              <Link to={`/product/${product._id}`}>
                <ImageHandler src={product.images[0]} alt={product.title} />
                <h3 className="text-[18px] font-semibold group-hover:text-blue-600 transition duration-300">
                  {product.title}
                </h3>
                <p>price : ${product.price}</p>
                <p className="line-clamp-3 text-justify">
                  {product.description}
                </p>
              </Link>
            </div>
          ))}
      </div>
      {products && !loading && products.length === 0 && offset > 0 && (
        <p>No more products found.</p>
      )}

      {products && !loading && products.length === 0 && offset === 0 && (
        <p>No result found</p>
      )}

      {handleNextPage && handlePrePage && (
        <Pagination
          handleNextPage={handleNextPage}
          handlePrePage={handlePrePage}
          hasMore={hasMore}
          offset={offset}
          loading={loading}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default ProductPresenter;
