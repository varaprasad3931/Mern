import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import API from "../services/api";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, qty });
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart({ ...product, qty });
      navigate("/checkout");
    }
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px", fontSize: "1.2rem" }}>Loading product details...</p>;
  if (error || !product) return <p style={{ textAlign: "center", marginTop: "50px", color: "red", fontSize: "1.2rem" }}>{error || "Product not found."}</p>;

  const oldPrice = Math.round(product.price * 1.3);
  const discount = Math.round(((oldPrice - product.price) / oldPrice) * 100);

  return (
    <div className="pd-container">
      {/* LEFT COLUMN: IMAGE GALLERY */}
      <div className="pd-left">
        <img src={product.image} alt={product.name} />
      </div>

      {/* CENTER COLUMN: DETAILS */}
      <div className="pd-center">
        <h1>{product.name}</h1>
        
        <div className="pd-rating">
          <span style={{ background: "#059669", color: "white", padding: "4px 8px", borderRadius: "4px", fontSize: "0.9rem" }}>
            {product.averageRating || "4.5"} ⭐
          </span>
          <span style={{ color: "#64748b", fontSize: "0.9rem" }}>12,345 Ratings & Reviews</span>
        </div>

        <div className="pd-price-box" style={{ marginBottom: "20px" }}>
          <span className="price">₹{product.price.toLocaleString("en-IN")}</span>
          <span className="old">₹{oldPrice.toLocaleString("en-IN")}</span>
          <span className="discount">{discount}% OFF</span>
        </div>

        <h3 style={{ marginBottom: "10px", fontSize: "1.1rem" }}>Product Description</h3>
        <p className="pd-desc">{product.description}</p>

        <h3 style={{ marginBottom: "10px", fontSize: "1.1rem" }}>Highlights</h3>
        <ul className="pd-features">
          <li>Premium Build Quality</li>
          <li>1 Year Brand Warranty</li>
          <li>7 Days Replacement Policy</li>
          <li>Cash on Delivery available</li>
        </ul>
      </div>

      {/* RIGHT COLUMN: BUY BOX */}
      <div className="pd-right-buybox">
        <h2 style={{ fontSize: "1.4rem", color: "#1e293b", marginBottom: "5px" }}>₹{product.price.toLocaleString("en-IN")}</h2>
        <p style={{ color: "#059669", fontSize: "0.9rem", fontWeight: "600" }}>FREE Delivery</p>
        
        <p className="stock-status">
          {product.stock > 0 ? `In Stock (${product.stock} left)` : <span style={{ color: "#dc2626" }}>Out of Stock</span>}
        </p>
        
        <p style={{ fontSize: "0.9rem", color: "#475569" }}>Sold by <strong>TrendEra Retail</strong></p>

        <div className="qty-box" style={{ display: "flex", alignItems: "center", gap: "15px", marginTop: "10px", marginBottom: "10px" }}>
          <span style={{ fontWeight: "600" }}>Quantity:</span>
          <select 
            value={qty} 
            onChange={(e) => setQty(Number(e.target.value))}
            style={{ padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "white", cursor: "pointer", width: "80px" }}
          >
            {[...Array(Math.min(10, product.stock)).keys()].map(x => (
              <option key={x + 1} value={x + 1}>{x + 1}</option>
            ))}
          </select>
        </div>

        <div className="pd-buttons" style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "10px" }}>
          <button className="cart-btn" onClick={handleAddToCart} disabled={product.stock === 0} style={{ opacity: product.stock === 0 ? 0.5 : 1 }}>
            🛒 Add to Cart
          </button>
          <button className="buy-btn" onClick={handleBuyNow} disabled={product.stock === 0} style={{ opacity: product.stock === 0 ? 0.5 : 1 }}>
            ⚡ Buy Now
          </button>
        </div>
        
        <div style={{ marginTop: "15px", display: "flex", alignItems: "center", gap: "10px", color: "#64748b", fontSize: "0.85rem" }}>
          <span>🔒 Secure transaction</span>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;