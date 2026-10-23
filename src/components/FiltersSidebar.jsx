function FilterSidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  maxPrice,
  onMaxPriceChange,
  sortBy,
  onSortChange,
}) {
  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <h3>Filters</h3>
      </div>

      <div className="filter-group">
        <label htmlFor="category-filter">Category</label>

        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(event) =>
            onCategoryChange(event.target.value)
          }
        >
          <option value="all">All categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="max-price">
          Maximum price: ${maxPrice}
        </label>

        <input
          id="max-price"
          type="range"
          min="0"
          max="1000"
          step="10"
          value={maxPrice}
          onChange={(event) =>
            onMaxPriceChange(Number(event.target.value))
          }
        />
      </div>

      <div className="filter-group">
        <label htmlFor="sort-by">Sort by</label>

        <select
          id="sort-by"
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="name">Name: A–Z</option>
        </select>
      </div>
    </aside>
  );
}

export default FilterSidebar;