import { Link } from "react-router-dom";
import { useShop } from "../hooks/useShop";
import { formatPrice } from "../utils/formatPrice";

function ProductCard({ product }) {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useShop();

  const favorite = isInWishlist(product.id);

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <button
          type="button"
          className={`wishlist-btn ${favorite ? "active" : ""}`}
          aria-label={
            favorite ? "Remove from wishlist" : "Add to wishlist"
          }
          onClick={() => toggleWishlist(product)}
        >
          {favorite ? "♥" : "♡"}
        </button>

        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
            loading="lazy"
            width="300"
            height="300"
          />
        </Link>
      </div>

      <div className="product-info">
        <p className="product-category">{product.category}</p>

        <Link
          to={`/products/${product.id}`}
          className="product-title-link"
        >
          <h3>{product.title}</h3>
        </Link>

        <div className="product-rating">
          <span>★</span>
          {product.rating?.rate ?? "N/A"}
          <span className="rating-count">
            ({product.rating?.count ?? 0})
          </span>
        </div>

        <div className="product-card-bottom">
          <strong>{formatPrice(product.price)}</strong>

          <button
            className="btn btn-small"
            type="button"
            onClick={() => addToCart(product)}
          >
            Add +
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;