import { Link } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";

function CartItem({ item, onRemove, onQuantityChange }) {
  return (
    <article className="cart-item">
      <Link to={`/products/${item.id}`} className="cart-item-image">
        <img src={item.image} alt={item.title} />
      </Link>

      <div className="cart-item-info">
        <Link to={`/products/${item.id}`}>
          <h3>{item.title}</h3>
        </Link>

        <p>{formatPrice(item.price)} each</p>

        <div className="quantity-control">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={item.quantity <= 1}
            onClick={() =>
              onQuantityChange(item.id, item.quantity - 1)
            }
          >
            −
          </button>

          <span>{item.quantity}</span>

          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() =>
              onQuantityChange(item.id, item.quantity + 1)
            }
          >
            +
          </button>
        </div>
      </div>

      <div className="cart-item-end">
        <strong>
          {formatPrice(item.price * item.quantity)}
        </strong>

        <button
          type="button"
          className="remove-btn"
          onClick={() => onRemove(item.id)}
        >
          Remove
        </button>
      </div>
    </article>
  );
}

export default CartItem;