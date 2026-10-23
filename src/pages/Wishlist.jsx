import { Link } from "react-router-dom";
import { useShop } from "../hooks/useShop";
import ProductGrid from "../components/ProductGrid";

function Wishlist() {
  const { wishlist } = useShop();

  return (
    <section className="section">
      <div className="page-heading">
        <span className="eyebrow">YOUR FAVORITES</span>
        <h1>Your wishlist</h1>
        <p>All the products you've saved in one place.</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">♡</div>
          <h2>No favorites yet</h2>
          <p>Tap the heart on a product to save it here.</p>

          <Link to="/products" className="btn">
            Discover products
          </Link>
        </div>
      ) : (
        <ProductGrid products={wishlist} />
      )}
    </section>
  );
}

export default Wishlist;