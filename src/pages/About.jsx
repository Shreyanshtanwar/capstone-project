import { Link } from "react-router-dom";

function About() {
  return (
    <section className="section about-section">
      <div className="about-hero">
        <span className="eyebrow">OUR STORY</span>

        <h1>
          Shopping should feel
          <br />
          <span>simple and enjoyable.</span>
        </h1>

        <p>
          ShopSphere is a web development capstone project that
          demonstrates how modern frontend technologies can be
          combined to create a responsive product discovery
          experience.
        </p>

        <Link to="/products" className="btn">
          Explore the collection →
        </Link>
      </div>

      <div className="about-grid">
        <article>
          <span className="about-number">01</span>
          <h2>Discover</h2>
          <p>
            Browse a catalog of sample products with images,
            descriptions, prices, and ratings.
          </p>
        </article>

        <article>
          <span className="about-number">02</span>
          <h2>Organize</h2>
          <p>
            Find products using search, category filters,
            price limits, and sorting options.
          </p>
        </article>

        <article>
          <span className="about-number">03</span>
          <h2>Save</h2>
          <p>
            Keep your favorite products and shopping cart
            available between browser sessions.
          </p>
        </article>
      </div>

      <p className="about-disclaimer">
        Product data is provided by a public demonstration API.
        ShopSphere is not a real online store and does not process
        payments.
      </p>
    </section>
  );
}

export default About;