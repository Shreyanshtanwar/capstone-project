import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../services/productServices";
import { useShop } from "../hooks/useShop";
import { formatPrice } from "../utils/formatPrice";
import Loader from "../components/Loader";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  useEffect(() => {
    const controller = new AbortController();

    async function loadProduct() {
      try {
        setLoading(true);
        setError("");
        setProduct(null);

        const data = await getProductById(id, controller.signal);

        if (!data || !data.id) {
          throw new Error("Product not found.");
        }

        setProduct(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to load product.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return <Loader message="Loading product details..." />;
  }

  if (error || !product) {
    return (
      <section className="section error-state">
        <h2>Product unavailable</h2>
        <p>{error || "We couldn't find that product."}</p>
        <Link to="/products" className="btn">
          Back to products
        </Link>
      </section>
    );
  }

  const favorite = isInWishlist(product.id);

  return (
    <section className="section details-section">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Products</Link>
        <span>/</span>
        <span>{product.category}</span>
      </div>

      <div className="product-details">
        <div className="details-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="details-content">
          <span className="eyebrow">{product.category}</span>

          <h1>{product.title}</h1>

          <div className="details-rating">
            <span>★</span> {product.rating?.rate ?? "N/A"}
            <span>
              ({product.rating?.count ?? 0} ratings)
            </span>
          </div>

          <p className="details-price">
            {formatPrice(product.price)}
          </p>

          <p className="details-description">
            {product.description}
          </p>

          <div className="details-actions">
            <button
              type="button"
              className="btn"
              onClick={() => addToCart(product)}
            >
              Add to cart
            </button>

            <button
              type="button"
              className="btn btn-outline"
              onClick={() => toggleWishlist(product)}
            >
              {favorite ? "♥ Saved" : "♡ Add to wishlist"}
            </button>
          </div>

          <div className="product-points">
            <p>✓ Product information from a public demo API</p>
            <p>✓ Add to your shopping cart anytime</p>
            <p>✓ Save favorites to your wishlist</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;