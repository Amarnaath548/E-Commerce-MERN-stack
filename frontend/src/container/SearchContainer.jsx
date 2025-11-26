import React, { useCallback, useState } from "react";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import { useNavigate } from "react-router-dom";

const SearchContainer = () => {
  
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [searchUrl, setSearchUrl] = useState("Perform a search to see the URL.");
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const initial = () => {
    setSearch("");
    setMinPrice(0);
    setMaxPrice(0);
    setCategoryId(0);
    setSearchUrl("");
    setShowFilter(false);
  };

  const handleSearch = useCallback(() => {
    const params = [];
    if (search.trim()) {
      params.push(`title=${encodeURIComponent(search.trim())}`);
    }
    if (minPrice >= 0 && maxPrice > minPrice) {
      const effectiveMin = Math.max(0, minPrice);
      const effectiveMax = Math.max(effectiveMin, maxPrice);
      if (effectiveMax > 0) {
        console.log(effectiveMin,effectiveMax)
        params.push(`price_min=${effectiveMin}`);
        params.push(`price_max=${effectiveMax}`);
      }
    }
    if (categoryId) {
      params.push(`categoryId=${categoryId}`);
    }
    if (params.length === 0) {
      const noFilterUrl = `/products`;
      setSearchUrl(noFilterUrl);
      console.log("Simulated Navigation URL:", noFilterUrl);
      navigate(noFilterUrl);
      initial();
      return;
    }
    const url = params.join("&");
    const fullUrl = `/products?${url}`;
    setSearchUrl(fullUrl);
    console.log("Simulated Navigation URL:", fullUrl, searchUrl);
    navigate(fullUrl);
    initial();
  }, [search, searchUrl, minPrice, maxPrice, categoryId, navigate]);


  return (
    
    <div className="w-full mx-auto">
      <SearchBar
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        setShowFilter={setShowFilter}
        showFilter={showFilter}
      />
      {showFilter && (
       
        <div className="mt-3 md:absolute md:top-[60px] md:z-10">
            <Filter
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                categoryId={categoryId}
                setCategoryId={setCategoryId}
            />
        </div>
      )}
    </div>
  );
};

export default SearchContainer;