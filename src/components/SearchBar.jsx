function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <span aria-hidden="true">⌕</span>

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
      />

      {value && (
        <button
          type="button"
          className="clear-search"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;