import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import API from "../services/api";

function Products() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const url =
          category && category !== "all"
            ? `/products?category=${category}`
            : "/products";

        const response = await API.get(url);

        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const categories = [
    "all",
    "mobiles",
    "shoes",
    "fashion",
    "electronics",
    "beauty",
    "accessories"
  ];

  return (
    <div className="products-layout">
      {/* SIDEBAR FILTER */}
      <aside className="filter-sidebar">
        <h3>Filters</h3>
        <div className="filter-section">
          <h4>Category</h4>
          {categories.map((cat) => (
            <label
              key={cat}
              className={
                category === cat || (!category && cat === "all")
                  ? "active-filter"
                  : ""
              }
              onClick={() =>
                cat === "all"
                  ? navigate("/products")
                  : navigate(`/products?category=${cat}`)
              }
            >
              <input
                type="radio"
                checked={category === cat || (!category && cat === "all")}
                readOnly
              />
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </label>
          ))}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="products-content" style={{ flex: 1 }}>
        <div className="products-header" style={{ marginBottom: "20px", borderBottom: "1px solid #e0e0e0", paddingBottom: "15px" }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "5px" }}>Explore Products</h1>
          <p style={{ color: "#64748b" }}>
            {category
              ? `Showing results for ${category} - ${products.length} items found`
              : `All Products - ${products.length} items found`}
          </p>
        </div>

        <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
          {loading ? (
            <p>Loading products...</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;