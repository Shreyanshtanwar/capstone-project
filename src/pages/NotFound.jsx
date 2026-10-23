import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="section not-found">
      <span className="not-found-code">404</span>

      <h1>Looks like you're lost.</h1>

      <p>The page you're looking for doesn't exist.</p>

      <Link to="/" className="btn">
        Back to home
      </Link>
    </section>
  );
}

export default NotFound;