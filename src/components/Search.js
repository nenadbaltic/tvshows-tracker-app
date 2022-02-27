import React from "react";

const Search = ({ onSearch }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    const inputValue = document.querySelector("#search-input").value;
    onSearch(inputValue);
  };
  return (
    <div className="filter-search">
      <form onSubmit={handleSearch}>
        <input id="search-input" type="text" placeholder="Search..." />
      </form>
    </div>
  );
};

export default Search;
