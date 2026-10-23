import { Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import ProductGrid from "../components/ProductGrid";
import Loader from "../components/Loader";

function Home() {
  const { products, loading, error } = useProducts();

  const featuredProducts = [...products]
    .sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0))
    .slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">THE EVERYDAY COLLECTION</span>

          <h1>
            Find your next
            <br />
            <span>favorite thing.</span>
          </h1>

          <p>
            Explore a thoughtfully curated collection of products
            for your everyday life.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="btn">
              Explore Collection →
            </Link>

            <Link to="/about" className="btn btn-outline">
              Our Story
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>24/7</strong>
              <span>Online browsing</span>
            </div>

            <div>
              <strong>Easy</strong>
              <span>Product discovery</span>
            </div>

            <div>
              <strong>Free</strong>
              <span>To explore</span>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-circle">
            <span className="hero-symbol">S</span>
          </div>

          <div className="floating-card">
            <span>✦</span>
            <div>
              <strong>Curated for you</strong>
              <p>Find something special.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">HANDPICKED</span>
            <h2>Featured products</h2>
            <p>Explore some of our highest-rated picks.</p>
          </div>

          <Link to="/products" className="text-link">
            View all products →
          </Link>
        </div>

        {loading && <Loader message="Finding your favorites..." />}

        {error && (
          <div className="error-state">
            <h3>We couldn't load the products.</h3>
            <p>{error}</p>
            <Link to="/products" className="btn">
              Browse collection
            </Link>
          </div>
        )}

        {!loading && !error && (
          <ProductGrid products={featuredProducts} />
        )}
      </section>

      <section className="promo-banner">
        <div>
          <span className="eyebrow">YOUR NEXT DISCOVERY</span>
          <h2>Something good is waiting.</h2>
          <p>Browse the collection and find your next favorite.</p>
        </div>

        <Link to="/products" className="btn btn-light">
          Shop the collection →
        </Link>
      </section>
    </>
  );
}

export default Home;