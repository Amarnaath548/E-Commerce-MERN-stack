import searchIcon from "../assets/search.svg";

const SearchBar = ({search, setSearch,handleSearch,setShowFilter,showFilter}) => {
    
  return (
    // Changed max-w-2xl to max-w-full and added px-4 for mobile spacing
    <div className={`relative w-full mx-auto px-1 ${showFilter && "mb-8"}`}>
      <button 
        onClick={() => setShowFilter(pre => !pre)} 
        
        className="absolute h-full top-1/2 left-0 transform -translate-y-1/2 px-3 py-2.5 bg-gray-300 hover:bg-gray-400 rounded-l-2xl text-sm font-medium transition duration-200"
      >
        Filter
      </button>
      <input
        
        className="w-full h-12 pl-22 p-3 pr-12 text-gray-700 rounded-2xl border border-gray-300 bg-white shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition duration-300 ease-in-out text-base"
        type="search"
        placeholder="Search product title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch();
        }}
      />

      <button
        className="absolute top-1/2 right-3 transform -translate-y-1/2 p-1 text-gray-500 hover:text-blue-600 transition duration-150 ease-in-out rounded-full hover:bg-blue-50"
        onClick={handleSearch}
        aria-label="Search"
      >
        <img className="w-5 h-5 cursor-pointer" src={searchIcon} alt="Search icon" />
      </button>
    </div>
  );
};

export default SearchBar;