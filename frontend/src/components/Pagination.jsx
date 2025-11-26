import React from "react";

const Pagination = ({
  handleNextPage,
  handlePrePage,
  hasMore,
  offset,
  loading,
  currentPage,
}) => {
  const activeStyles =
    "p-3 rounded-lg text-white font-semibold transition-colors duration-200 bg-blue-700 hover:bg-blue-600";

  const disabledStyles =
    "disabled:bg-gray-400 disabled:opacity-75 disabled:cursor-not-allowed";
  return (
    <div className="flex justify-center gap-5 mb-3">
      <button
        className={`${activeStyles} ${disabledStyles}`}
        onClick={handlePrePage}
        disabled={offset === 0 || loading}
      >
        &larr; Previous
      </button>
      <p className="p-3 font-bold text-xl">{currentPage}</p>
      <button
        className={`${activeStyles} ${disabledStyles}`}
        onClick={handleNextPage}
        disabled={!hasMore || loading}
      >
        Next &rarr;
      </button>
    </div>
  );
};

export default Pagination;
