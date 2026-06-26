import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Orders() {
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userInfo) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data } = await API.get("/orders/myorders");
        setOrders(data);
      } catch (err) {
        console.error("Error fetching user orders:", err);
        setError("Failed to load your orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userInfo]);

  if (!userInfo) {
    return (
      <div className="orders-page" style={{ textAlign: "center", paddingTop: "50px" }}>
        <h2>Please login to track and view your orders.</h2>
        <button 
          onClick={() => navigate("/login")}
          style={{
            padding: "10px 25px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            marginTop: "15px"
          }}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track and manage all your purchases in one place.</p>
      </div>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading your orders...</p>
      ) : error ? (
        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
      ) : orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <h3>You haven't placed any orders yet.</h3>
          <button 
            onClick={() => navigate("/products")}
            style={{
              padding: "10px 20px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              marginTop: "15px"
            }}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        orders.map((order) => {
          const firstItem = order.orderItems[0];
          const otherItemsCount = order.orderItems.length - 1;
          const productName = firstItem?.product?.name || "Product Item";
          const productImage = firstItem?.product?.image || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600";

          return (
            <div key={order._id} className="order-card">
              <img
                src={productImage}
                alt={productName}
              />

              <div className="order-info">
                <h3>
                  {productName}
                  {otherItemsCount > 0 && ` + ${otherItemsCount} more item(s)`}
                </h3>

                <p>
                  Order ID:
                  <strong> {order._id}</strong>
                </p>

                <p>
                  Ordered On:
                  <strong> {new Date(order.createdAt).toLocaleDateString()}</strong>
                </p>

                <h2>₹{order.totalAmount}</h2>

                <span
                  className={`order-status ${order.orderStatus.toLowerCase()}`}
                >
                  {order.orderStatus}
                </span>
              </div>

              <div className="order-actions">
                <button className="track-btn">
                  Track Order
                </button>

                <button className="invoice-btn">
                  Download Invoice
                </button>

                <button className="cancel-btn">
                  Cancel Order
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Orders;