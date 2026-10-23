import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <Link to="/" className="logo footer-logo">
            Shop<span>Sphere</span>
          </Link>

          <p>
            Discover products you'll love. Simple shopping,
            thoughtfully designed.
          </p>
        </div>

        <div className="footer-links">
          <Link to="/products">Shop Products</Link>
          <Link to="/wishlist">Your Wishlist</Link>
          <Link to="/about">About Us</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} ShopSphere. Built as a
          web development capstone project.
        </p>
      </div>
    </footer>
  );
}

export default Footer;