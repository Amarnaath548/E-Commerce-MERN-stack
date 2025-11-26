import React from "react";

const FilterByPrice = ({ minPrice, setMinPrice, maxPrice, setMaxPrice }) => {
  const handleMinChange = (e) => {
    const value = parseInt(e.target.value)
    setMinPrice(value);
    
  };

  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value);
    setMaxPrice(value);
  };
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-xl shadow-inner border border-gray-200 h-fit w-fit">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Filter By Price Range ($)</h3>
      <div className=" space-x-4">
        <div className="flex flex-col flex-1">
          <label htmlFor="min-price" className="text-sm font-medium text-gray-500 mb-1">Min Price</label>
          <input
            id="min-price"
            type="number"
            min={0}
            value={minPrice}
            onChange={handleMinChange}
            placeholder="Min"
            className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label htmlFor="max-price" className="text-sm font-medium text-gray-500 mb-1">Max Price</label>
          <input
            id="max-price"
            type="number"
            min={minPrice}
            value={maxPrice}
            onChange={handleMaxChange}
            placeholder="Max"
            className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterByPrice;
