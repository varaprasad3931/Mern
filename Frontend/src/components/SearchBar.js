import { useState } from "react";

function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (!keyword.trim()) return;

    if (onSearch) {
      onSearch(keyword);
    }

    console.log("Searching:", keyword);
  };

  return (
    <form
      className="search-bar"
      onSubmit={submitHandler}
    >
      <div className="search-container">

        <span className="search-icon">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search products, brands and categories..."
          value={keyword}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
        />

        <button type="submit">
          Search
        </button>

      </div>
    </form>
  );
}

export default SearchBar;