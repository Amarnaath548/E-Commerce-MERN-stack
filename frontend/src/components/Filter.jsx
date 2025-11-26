import FilterByCategory from "./FilterByCategory";
import FilterByPrice from "./FilterByPrice";

const Filter = ({minPrice, setMinPrice,maxPrice, setMaxPrice,categoryId,setCategoryId}) => {
    
  return (
    // The grid-cols-1 (default) and md:grid-cols-2 ensures responsiveness here.
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4"> 
      <FilterByCategory categoryId={categoryId} setCategoryId={setCategoryId} />
      <FilterByPrice
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />
    </div>
  );
};

export default Filter;