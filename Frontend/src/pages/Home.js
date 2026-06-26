import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import API from "../services/api";

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-overlay">
          <h1>Big Billion Sale</h1>
          <p>Up to 70% Off on Fashion & Electronics</p>

          <button
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="home-section">
        <h2>Shop By Category</h2>

        <div className="category-grid">

          <div
            className="category-box"
            onClick={() =>
              navigate("/products?category=fashion")
            }
          >
            👕 Fashion
          </div>

          <div
            className="category-box"
            onClick={() =>
              navigate("/products?category=mobiles")
            }
          >
            📱 Mobiles
          </div>

          <div
            className="category-box"
            onClick={() =>
              navigate("/products?category=electronics")
            }
          >
            💻 Electronics
          </div>

          <div
            className="category-box"
            onClick={() =>
              navigate("/products?category=beauty")
            }
          >
            💄 Beauty
          </div>

          <div
            className="category-box"
            onClick={() =>
              navigate("/products?category=shoes")
            }
          >
            👟 Shoes
          </div>

          <div
            className="category-box"
            onClick={() =>
              navigate("/products?category=accessories")
            }
          >
            🎒 Accessories
          </div>

        </div>
      </section>

      {/* Trending Products */}
      <section className="home-section">
        <h2>Trending Products</h2>

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading trending products...</p>
        ) : (
          <div className="products-grid">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>

      {/* Offer Banner */}
      <section className="offer-banner">
        <div>
          <h2>Summer Sale</h2>
          <p>
            Flat 50% Off On Selected Products
          </p>

          <button
            onClick={() => navigate("/products")}
            className="offer-btn"
          >
            Explore Offers
          </button>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="home-section">
        <h2>Best Sellers</h2>

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading best sellers...</p>
        ) : (
          <div className="products-grid">
            {products.slice(4, 8).map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Home;