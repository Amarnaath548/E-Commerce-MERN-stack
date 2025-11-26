import useFetch from "../CustomHook/UseFetch";
import Loading from "./Loading";
import ErrorComponent from "./ErrorComponent";

const FilterByCategory = ({ categoryId, setCategoryId }) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/categories`;
  const { data: categories, loading, error } = useFetch(url);

  if (error) <ErrorComponent error={error} />;
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-xl shadow-inner border border-gray-200 w-fit">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">
        Filter By Category
      </h3>
      {loading && <Loading data="Categories" />}
      <div className="space-y-2">
        {/* All Categories Button */}

        {/* Category List */}
        {categories &&
          categories.map((category) => (
            <div
              key={category._id}
              onClick={() => setCategoryId(category._id)}
              className={`p-2 rounded-lg cursor-pointer transition duration-150 ease-in-out ${
                categoryId === category._id
                  ? "bg-blue-500 text-white font-semibold"
                  : "hover:bg-blue-50 text-gray-600"
              }`}
            >
              <p>{category.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FilterByCategory;
