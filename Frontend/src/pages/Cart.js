import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  
  // Simulated discount (10% off on total if above 1000)
  const discount = total > 1000 ? Math.round(total * 0.1) : 0;
  const deliveryCharges = total > 500 ? 0 : 50;
  const finalAmount = total - discount + deliveryCharges;

  return (
    <div className="cart-page">
      {/* LEFT COLUMN: SHOPPING CART ITEMS */}
      <div className="cart-left">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid #f1f5f9", paddingBottom: "15px", marginBottom: "10px" }}>
          <h2 style={{ fontSize: "1.8rem", color: "#1e293b" }}>Shopping Cart</h2>
          <span style={{ color: "#64748b" }}>Price</span>
        </div>

        {cart.length === 0 ? (
          <div style={{ padding: "40px 20px", textAlign: "center" }}>
            <h3 style={{ marginBottom: "15px", color: "#475569" }}>Your TrendEra Cart is empty.</h3>
            <Link to="/products" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "600", fontSize: "1.1rem" }}>
              Shop today's deals
            </Link>
          </div>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item._id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-info">
                <h3><Link to={`/product/${item._id}`} style={{ textDecoration: "none", color: "#1e293b" }}>{item.name}</Link></h3>
                <p className="seller">Sold by: TrendEra Retail</p>
                <p style={{ color: "#059669", fontWeight: "600", marginBottom: "15px", fontSize: "0.9rem" }}>In Stock</p>

                <div className="cart-actions">
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#f8fafc", padding: "5px 10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                    <span style={{ fontSize: "0.9rem", color: "#475569" }}>Qty:</span>
                    <select 
                      value={item.qty} 
                      onChange={(e) => addToCart({ ...item, qty: Number(e.target.value) - item.qty })}
                      style={{ background: "transparent", border: "none", outline: "none", cursor: "pointer", fontWeight: "600" }}
                    >
                      {[...Array(Math.min(10, item.stock)).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      ))}
                    </select>
                  </div>
                  
                  <span style={{ color: "#cbd5e1" }}>|</span>
                  
                  <button onClick={() => removeFromCart(item._id)} className="remove-link">
                    Delete
                  </button>
                </div>
              </div>

              <div className="cart-price" style={{ textAlign: "right", minWidth: "100px" }}>
                ₹{(item.price * item.qty).toLocaleString("en-IN")}
              </div>
            </div>
          ))
        )}
      </div>

      {/* RIGHT COLUMN: ORDER SUMMARY */}
      {cart.length > 0 && (
        <div className="cart-right">
          <h3>Price Details</h3>

          <div className="summary-row">
            <span>Price ({totalItems} items)</span>
            <span>₹{total.toLocaleString("en-IN")}</span>
          </div>

          <div className="summary-row">
            <span>Discount</span>
            <span style={{ color: "#059669" }}>- ₹{discount.toLocaleString("en-IN")}</span>
          </div>

          <div className="summary-row">
            <span>Delivery Charges</span>
            <span style={{ color: deliveryCharges === 0 ? "#059669" : "#1e293b" }}>
              {deliveryCharges === 0 ? "FREE Delivery" : `₹${deliveryCharges}`}
            </span>
          </div>

          <div className="summary-row total">
            <span>Total Amount</span>
            <span>₹{finalAmount.toLocaleString("en-IN")}</span>
          </div>

          <p style={{ color: "#059669", fontWeight: "600", marginBottom: "25px", fontSize: "0.95rem" }}>
            You will save ₹{discount.toLocaleString("en-IN")} on this order
          </p>

          <button className="cart-btn" onClick={() => navigate("/checkout")} style={{ width: "100%", fontSize: "1.1rem", padding: "15px" }}>
            Proceed to Buy
          </button>
          
          <div style={{ marginTop: "15px", display: "flex", gap: "10px", alignItems: "center", justifyContent: "center", color: "#64748b", fontSize: "0.85rem" }}>
            <span>🔒 Secure checkout</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;