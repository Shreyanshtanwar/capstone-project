import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useShop } from "../hooks/useShop";

function Navbar() {
  const { cartCount, wishlist } = useShop();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          Shop<span>Sphere</span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav
          id="primary-navigation"
          className={`nav-links ${menuOpen ? "nav-open" : ""}`}
        >
          <NavLink to="/" end onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/products" onClick={closeMenu}>
            Products
          </NavLink>

          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>

          <NavLink to="/wishlist" onClick={closeMenu}>
            Wishlist ({wishlist.length})
          </NavLink>

          <NavLink to="/cart" onClick={closeMenu}>
            Cart ({cartCount})
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;