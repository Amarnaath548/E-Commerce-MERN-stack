import React, { useMemo, useState } from "react";
import useFetch from "./UseFetch";

const usePaginationFetch = (baseUrl) => {
  const [offset, setOffset] = useState(0);
  const pagelimit = 10;

  

  const url = useMemo(() => {
    return `${baseUrl}offset=${offset}&limit=${pagelimit}`;
  }, [offset, baseUrl, pagelimit]);

  const { data: products, loading, error } = useFetch(url);
  let hasMore = false;
  if (products) {
    hasMore = products.length === pagelimit;
  }

  const handlePrePage = () => {
    if (offset > 0) {
      setOffset((prevOffset) => prevOffset - pagelimit);
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      setOffset((prevOffset) => prevOffset + pagelimit);
    }
  };

  const currentPage = offset / pagelimit + 1;
  return {
    products,
    loading,
    error,
    hasMore,
    handlePrePage,
    handleNextPage,
    currentPage,
    offset,
  };
};

export default usePaginationFetch;
