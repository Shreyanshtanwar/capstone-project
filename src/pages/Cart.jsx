import { Link } from "react-router-dom";
import { useShop } from "../hooks/useShop";
import { formatPrice } from "../utils/formatPrice";
import CartItem from "../components/CartItem";

function Cart() {
  const {
    cart,
    cartTotal,
    removeFromCart,
    updateQuantity,
  } = useShop();

  if (cart.length === 0) {
    return (
      <section className="section empty-cart">
        <div className="empty-icon">🛒</div>
        <span className="eyebrow">YOUR BAG</span>
        <h1>Your cart is waiting.</h1>
        <p>Explore the collection and add something you love.</p>

        <Link to="/products" className="btn">
          Explore products →
        </Link>
      </section>
    );
  }

  return (
    <section className="section cart-section">
      <div className="page-heading">
        <span className="eyebrow">YOUR BAG</span>
        <h1>Shopping cart</h1>
        <p>Review your selected products.</p>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={removeFromCart}
              onQuantityChange={updateQuantity}
            />
          ))}

          <Link to="/products" className="text-link">
            ← Continue shopping
          </Link>
        </div>

        <aside className="order-summary">
          <h2>Order summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <span>
              {cart.reduce(
                (total, item) => total + item.quantity,
                0
              )}
            </span>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatPrice(cartTotal)}</strong>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>Not calculated</span>
          </div>

          <div className="summary-total">
            <span>Total before shipping</span>
            <strong>{formatPrice(cartTotal)}</strong>
          </div>

          <button
            type="button"
            className="btn checkout-btn"
            onClick={() =>
              window.alert(
                "This is a demonstration project. Online checkout has not been implemented."
              )
            }
          >
            Proceed to checkout
          </button>

          <p className="summary-note">
            Demo checkout only. No payment will be processed.
          </p>
        </aside>
      </div>
    </section>
  );
}

export default Cart;