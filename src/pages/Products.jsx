import { useMemo, useState } from "react";
import useProducts from "../hooks/useProducts";
import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FiltersSidebar";
import Loader from "../components/Loader";

function Products() {
  const { products, loading, error } = useProducts();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState("featured");

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;

      const matchesPrice = product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    result = [...result];

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        result.sort(
          (a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0)
        );
        break;

      case "name":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;

      default:
        break;
    }

    return result;
  }, [
    products,
    searchTerm,
    selectedCategory,
    maxPrice,
    sortBy,
  ]);

  function resetFilters() {
    setSearchTerm("");
    setSelectedCategory("all");
    setMaxPrice(1000);
    setSortBy("featured");
  }

  return (
    <section className="section catalog-section">
      <div className="page-heading">
        <span className="eyebrow">THE COLLECTION</span>
        <h1>Explore products</h1>
        <p>Find something you'll love.</p>
      </div>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <div className="catalog-layout">
        <FilterSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          maxPrice={maxPrice}
          onMaxPriceChange={setMaxPrice}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <div className="catalog-results">
          {!loading && !error && (
            <div className="results-toolbar">
              <p>
                Showing <strong>{filteredProducts.length}</strong>{" "}
                products
              </p>

              <button
                type="button"
                className="text-link"
                onClick={resetFilters}
              >
                Reset filters
              </button>
            </div>
          )}

          {loading && <Loader message="Loading collection..." />}

          {error && (
            <div className="error-state">
              <h3>Unable to load products</h3>
              <p>{error}</p>
              <button
                type="button"
                className="btn"
                onClick={() => window.location.reload()}
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
    </section>
  );
}

export default Products;